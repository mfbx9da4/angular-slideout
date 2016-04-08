var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');


gulp.task('demo', function() {
  return gulp.src('./demo/main.js')
    .pipe(gulpWebpack({
    	watch: true,
    	output:{filename:'bundle.js'}
    }))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('slideout', function() {
  return gulp.src('./src/slideout.js')
    .pipe(gulpWebpack({
    	watch: true,
    	output:{filename:'slideout.min.js'},
    	module: {
    	    loaders: [
    	        { test: /\.css$/, loader: "style-loader!css-loader" }
    	    ]
    	},
        plugins: [new webpack.optimize.UglifyJsPlugin()]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.start('demo');
    gulp.start('slideout');
})
