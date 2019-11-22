// This is client side config only - don't put anything in here that shouldn't be public!
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}
/*

 This is to import global less files as well as css modules

 from https://github.com/zeit/next-plugins/issues/135#issuecomment-415965282
 -> files in avoidPaths will never be transformed

*/

const avoidPaths = ['styles/global/', 'node_modules'].map(d => path.join(__dirname, d));

function canBeTransformed(pathToCheck) {
  return !avoidPaths.some(v => {
    const pathToInclude = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
    return v.includes(pathToInclude);
  });
}

module.exports = withPlugins([
  withLess({
    cssModules: true,
    cssLoaderOptions: {
      getLocalIdent: (loaderContext, localIdentName, localName) => {
        const fileName = path.basename(loaderContext.resourcePath);
        const shoudTransform = canBeTransformed(loaderContext.resourcePath);

        if (!shoudTransform) {
          return localName;
        }
        const name = fileName.replace(/\.[^/.]+$/, '');
        return `${name}___${localName}`;
      },
    },
  }),
]);
