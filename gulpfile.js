var gulp = require('gulp');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');

gulp.task('demo', function() {
  return gulp.src('./demo/main.js')
    .pipe(webpack({
    	watch: true,
    	output:{filename:'bundle.js'}
    }))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('slideout', function() {
  return gulp.src('./src/slideout.js')
    .pipe(webpack({
    	watch: true,
    	output:{filename:'slideout.js'},
    	module: {
    	    loaders: [
    	        { test: /\.css$/, loader: "style-loader!css-loader" }
    	    ]
    	}
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.start('demo');
    gulp.start('slideout');
})
