# 一、 electron
`electron` 必须放在 `devDependencies` 中。  

# 二、 author
```
⨯ Please specify author 'email' in the application package.json

See https://docs.npmjs.com/files/package.json#people-fields-author-contributors

It is required to set Linux .deb package maintainer. Or you can set maintainer in the custom linux options.
(see https://www.electron.build/configuration/linux).
  stackTrace=
  Error: Please specify author 'email' in the application package.json
  See https://docs.npmjs.com/files/package.json#people-fields-author-contributors
  
  It is required to set Linux .deb package maintainer. Or you can set maintainer in the custom linux options.
  (see https://www.electron.build/configuration/linux).
  
  at FpmTarget.computeFpmMetaInfoOptions (/home/song/Workspace/electron/via/node_modules/app-builder-lib/src/targets/fpm.ts:82:13)

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

package.json 必须配置 `author`  
或者  
electron-builder.yml 配置 `linux` 的 [maintainer](https://www.electron.build/configuration/linux)。  


