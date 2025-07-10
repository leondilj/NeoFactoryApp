@echo off
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
  echo Erro no build do frontend!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 2. Copiar build para backend (executando copy-to-backend.js)
call node ../tools/copy-to-backend.js
if errorlevel 1 (
  echo Erro ao executar copy-to-backend.js!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 3. Publicar backend
cd ..\%BACKEND_PATH%
dotnet publish -c Release -o publish
if errorlevel 1 (
  echo Erro no publish do backend!
  pause
  exit /b 1
)

echo ---------------------------------------
echo 4. Criar arquivo zip do conteúdo da pasta publish
cd publish
tar -a -c -f ..\%ZIP_PATH% .
cd ..

echo ---------------------------------------
echo 5. Fazer deploy no Azure
az webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE% --src-path ..\%ZIP_PATH%

echo ---------------------------------------
echo Deploy finalizado!
pause
