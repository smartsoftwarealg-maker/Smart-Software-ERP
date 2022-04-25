@echo off
cls
echo Building...
call nx build erp --prod --skip-nx-cache --namedChunks=false --buildOptimizer --extractLicenses --optimization --no-sourceMap



