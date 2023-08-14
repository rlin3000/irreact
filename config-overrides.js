const { override } = require('customize-cra');
const rewirePostcss = require('react-app-rewire-postcss');
const px2rem = require('postcss-px2rem-exclude')

module.exports = override(
    (config, env) => {
        rewirePostcss(config, {
            plugins: () => [
                px2rem({
                    remUnit: 37.5,
                    exclude: /node_modules/i
                })
            ],
        });
        return config;
    }
);