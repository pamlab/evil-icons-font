'use strict';

const gulp        = require('gulp');
const rename      = require("gulp-rename");
const iconfont    = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

const fontName    = 'evil-icons'; // シンボルフォント名
const runTimestamp = Math.round(Date.now()/1000);

gulp.task('build', () => {
    return gulp.src(['src/icons/*.svg'])
        .pipe(iconfont({
            fontName       : fontName,
            appendUnicode  : true,
            formats        : ['ttf', 'woff', 'woff2'],
            timestamp      : runTimestamp,
            startCodepoint : 0xF001,
            normalize      : true,
            fontHeight     : 1000
        }))
        .on('glyphs', glyphs => {
            const options = {
                glyphs    : glyphs,
                fontName  : fontName,
                fontPath  : '../fonts/',
                className : 'icon'
            };

            // シンボルフォント用のcssを作成
            gulp.src('src/templates/font.css')
                .pipe(consolidate('lodash', options))
                .pipe(rename({ basename: fontName }))
                .pipe(gulp.dest('dst/css/'));
        
            // シンボルフォント一覧のサンプルHTMLを作成
            gulp.src('src/templates/font.html')
                .pipe(consolidate('lodash', options))
                .pipe(rename({ basename: 'sample' }))
                .pipe(gulp.dest('dst/'));

        })
        .pipe(gulp.dest('dst/fonts/'));
});

gulp.task('default', ['build']);
