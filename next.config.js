const path = require('path');
const withImages = require('next-images');
module.exports = withImages();

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

module.exports = withImages({
    exclude: path.resolve(__dirname, 'src/assets/svg'),
    webpack(config, options) {
        return config;
    }
});
