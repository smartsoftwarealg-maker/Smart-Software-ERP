@echo off
cls
echo Building...
call nx build exchange --prod --skip-nx-cache --namedChunks=true --buildOptimizer --extractLicenses --optimization --no-sourceMap



