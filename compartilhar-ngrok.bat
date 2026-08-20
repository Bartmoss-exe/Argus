@echo off
REM ============================================================
REM  ARGUS - Compartilhar via ngrok
REM  Pre-requisito (UMA VEZ, como Administrador):
REM  powershell -Command "Add-MpPreference -ExclusionPath '%~dp0tools'"
REM ============================================================
cd /d %~dp0

REM Garante npm no PATH (runtime do Kimi como fallback)
where npm >nul 2>nul || set "PATH=%PATH%;%LOCALAPPDATA%\Programs\Kimi\resources\resources\runtime"

REM Re-extrai o ngrok se o antivirus tiver removido o exe
if not exist tools\ngrok\ngrok.exe (
  echo Extraindo ngrok...
  mkdir tools\ngrok 2>nul
  tar -xf tools\ngrok.zip -C tools\ngrok
)

if not exist dist\index.html (
  echo Gerando build de producao...
  call npm run build
)

start "ARGUS Preview" cmd /k "npm run preview -- --port 7100 --strictPort"
timeout /t 4 >nul

echo.
echo ============================================
echo   O link publico aparecera abaixo (Forwarding)
echo ============================================
echo.
tools\ngrok\ngrok.exe http 7100
pause
