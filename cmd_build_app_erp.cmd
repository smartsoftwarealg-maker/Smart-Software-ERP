@echo off
cls
echo Building...
call nx build erp --prod --skip-nx-cache --namedChunks=true --buildOptimizer --extractLicenses --optimization --no-sourceMap



