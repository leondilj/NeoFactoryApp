@echo off
setlocal

REM === Variáveis de caminho e configuração ===
set FRONTEND_PATH=frontend
set BACKEND_PATH=backend\FinanceAPI
set ZIP_PATH=publish.zip
set RESOURCE_GROUP=NeoFactorySite
set APP_SERVICE=AppNeoNew

echo ---------------------------------------
echo 1. Build do frontend
cd %FRONTEND_PATH%
call npm run build
if errorlevel 1 (
  echo [ERRO] Falha ao executar build do frontend!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 2. Copiar build para backend (executando copy-to-backend.js)
call node ../tools/copy-to-backend.js
if errorlevel 1 (
  echo [ERRO] Falha ao copiar arquivos do frontend para o backend!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 3. Remover pasta 'publish' antiga
cd ..\%BACKEND_PATH%
if exist publish (
  echo Deletando pasta antiga 'publish'...
  rmdir /s /q publish
)

echo ---------------------------------------
echo 4. Publicar backend
dotnet publish -c Release -o publish
if errorlevel 1 (
  echo [ERRO] Falha ao publicar o backend!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 5. Criar ZIP para deploy
cd publish

if exist ..\%ZIP_PATH% (
  echo Apagando arquivo %ZIP_PATH% anterior...
  del ..\%ZIP_PATH%
)

REM Cria o ZIP com caminhos compatíveis com Linux
powershell -NoLogo -NoProfile -Command "Add-Type -A 'System.IO.Compression.FileSystem'; $source = Get-ChildItem -Recurse -File -Path .; $zipPath = '..\\%ZIP_PATH%'; if (Test-Path $zipPath) { Remove-Item $zipPath }; $zip = [IO.Compression.ZipFile]::Open($zipPath, 'Create'); foreach ($file in $source) { $entryName = $file.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/'); [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $entryName) }; $zip.Dispose()"

if errorlevel 1 (
  echo [ERRO] Falha ao criar o ZIP!
  pause
  exit /b 1
)

echo ---------------------------------------
echo Deploy ZIP criado com sucesso: %ZIP_PATH%

echo ---------------------------------------
echo 6. Verificar CLI do Azure
where az >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Azure CLI não está instalado ou não está no PATH.
  pause
  exit /b 1
)

echo ---------------------------------------
echo 7. Fazer deploy no Azure

az webapp deploy ^
  --resource-group %RESOURCE_GROUP% ^
  --name %APP_SERVICE% ^
  --src-path ..\%ZIP_PATH% ^
  --type zip

if errorlevel 1 (
  echo [ERRO] Falha ao fazer o deploy no Azure!
  pause
  exit /b 1
)
