# ============================================================
#  ARGUS — Compartilhar site publicamente (Cloudflare Tunnel)
#  Uso: duplo clique em compartilhar.bat
#  Opcional: defina $env:ARGUS_WEBHOOK com a URL do seu webhook
#  (Discord/Slack) para o link ser postado automaticamente.
# ============================================================

$ErrorActionPreference = 'SilentlyContinue'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# Localiza o npm (PATH ou runtime do Kimi)
$npm = (Get-Command npm -ErrorAction SilentlyContinue).Source
if (-not $npm) { $npm = "$env:LOCALAPPDATA\Programs\Kimi\resources\resources\runtime\npm.cmd" }

# 1. Build de producao, se ainda nao existir
if (-not (Test-Path "$root\dist\index.html")) {
  Write-Host "Gerando build de producao..." -ForegroundColor Yellow
  cmd /c "`"$npm`" run build"
}

# 2. Sobe o servidor local (build de producao)
$preview = Start-Process -PassThru -WindowStyle Minimized cmd `
  -ArgumentList "/c `"`"$npm`"`" run preview -- --port 7100 --strictPort"
Start-Sleep -Seconds 5

# 3. Abre o tunel publico
$log = "$root\tools\tunnel.log"
Remove-Item $log -Force
$tunnel = Start-Process -PassThru -WindowStyle Minimized cmd `
  -ArgumentList "/c `"`"$root\tools\cloudflared.exe`"`" tunnel --url http://localhost:7100 --logfile `"$log`" --loglevel info"

# 4. Captura a URL publica gerada
$url = $null
for ($i = 0; $i -lt 40 -and -not $url; $i++) {
  Start-Sleep -Seconds 1
  if (Test-Path $log) {
    $m = Select-String -Path $log -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' | Select-Object -First 1
    if ($m) { $url = $m.Matches[0].Value }
  }
}

if (-not $url) {
  Write-Host "Falha ao obter a URL publica. Veja tools\tunnel.log" -ForegroundColor Red
} else {
  Write-Host ""
  Write-Host "============================================" -ForegroundColor DarkGray
  Write-Host "  SITE PUBLICO: $url" -ForegroundColor Green
  Write-Host "============================================" -ForegroundColor DarkGray
  Write-Host ""

  # 5. Envia o link para o webhook, se configurado
  if ($env:ARGUS_WEBHOOK) {
    # Discord usa "content"; para Slack, troque por @{ text = "..." }
    $body = @{ content = "ARGUS no ar: $url" } | ConvertTo-Json
    Invoke-RestMethod -Uri $env:ARGUS_WEBHOOK -Method Post -ContentType 'application/json' -Body $body
    Write-Host "Link enviado ao webhook." -ForegroundColor Cyan
  } else {
    Write-Host "Dica: defina a variavel ARGUS_WEBHOOK com a URL do seu webhook para envio automatico." -ForegroundColor DarkYellow
  }
}

Write-Host ""
Write-Host "Pressione ENTER para encerrar o tunel e o servidor..." -ForegroundColor DarkGray
Read-Host | Out-Null
Stop-Process -Id $tunnel.Id -Force
Stop-Process -Id $preview.Id -Force
