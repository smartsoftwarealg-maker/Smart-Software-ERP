@echo off
cls
# nx serve erp --host 0.0.0.0 --aot --disable-host-check
# nx generate @nrwl/angular:app myapp
# npx nx g @nrwl/angular:lib api-angular-order --directory common --dry-run
# npx nx g @nrwl/angular:service sales-order --path libs/sales/api-sales-order/src/lib --dry-run
# npx nx g @nrwl/angular:class sales-order-api --path libs/sales/api-sales-order/src/lib
# npx nx g @nrwl/angular:lib ui-sales-order --directory sales --dry-run
# npx nx g @nrwl/angular:module ui-sales-order --directory sales/ui-sales-order/lib --dry-run
# npx nx g @nrwl/angular:component ui-order-detail --path libs/sales/ui-sales-order/src/libs --skipImport --dry-run
# nx g component doc-info --path=libs/logistics/ui-doc-info/src/lib --project=ui-doc-info --module=logistics-ui-doc-info --flat --dry-run
# nx g c order-lines-detail --path=libs/sales/ui-order-lines/src/lib --project=ui-order-lines --module=sales-ui-order-lines --dry-run
# nx g c order-lines-detail --path=libs/logistics/ui-stock-info/src/lib --project=ui-stock-info --module=logistics-ui-stock-info --flat --dry-run
# *******************************************************************************
# Capacitor Installation
# https://nxtend.dev/docs/capacitor/getting-started
# *******************************************************************************
# ng add @nxtend/capacitor
# npm install --save-dev --exact @nxtend/capacitor
# nx generate @nxtend/capacitor:init
# nx generate @nxtend/capacitor:capacitor-project --project mobile-app --npmClient yarn
# nx generate @nxtend/capacitor:capacitor-project --project {frontend project name} --npmClient {yarn or npm}
# nx generate @nxtend/capacitor:capacitor-project --project mobile-app --npmClient npm
# nx run {Capacitor project name}:add --platform {native platform}
# nx run mobile-cespace:add --platform android
# nx run {frontend project}:add:ios
# nx run {frontend project}:add:android
# nx run {frontend project}:add --platform {native platform}
# nx run my-app:add:android
# nx run my-app:cap --cmd="add android"
# nx generate @nxtend/capacitor:capacitor-project --project cespace --npmClient npm --appId com.smartsoftware.cespace --appName smart-cespace
# nx run mobile-app-cap:add --platform android
