var express = require('express');
var fs = require('fs');
var wrench = require("wrench");
var app = express();
var mysql = require('mysql');
var knex = require('knex')({
    client: 'mysql',
    version: '8.0.16',
    connection: {
        host: "localhost",
        port: '3306',
        user: "root",
        password: "password",
        database: 'mydb'
    }
})




app.use('/public', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    let fl = [];
    let dirs = [];
    let fnames = []
    let sngs = [];
    var siz;
    var currnetalbum;
    var albums = [];
    let num = req.query.num;
    let artists = fs.readFileSync('public/artist.txt', 'utf-8');
    console.log(artists);
    console.log('searching...');
    var files = wrench.readdirSyncRecursive("music");
    console.log('FILS LENGTH ' + files.length)
    fs.readdir('music', function (err, fils) {
        fl = fils;
        console.log('files ' + fils);
        console.log("fl: " + fl.length);
        siz = fl.length
        fs.writeFileSync('public/siz.txt', siz, 'utf-8')
        console.log("fl2: " + siz);
        fs.writeFileSync('public/artist.txt', fils, 'utf-8')

        files = files.filter(item => !fl.includes(item))
        files = files.filter(item => item.includes('.mp3'))
        console.log('fils after NUMBER : ' + files.length)
        console.log('fils after : ' + files)
        fs.writeFileSync('public/number.txt', files.length, 'utf-8')
        for (var i = 0; i < siz; i++) {
            var fls = fl;



            // console.log("Current FL : "+fl);
            //  console.log("Current FL["+i+"] : "+fl[i]);
            var fname = 'public/art/' + fl[i] + '.txt';
            var pathDir = 'music/' + fl[i].toString() + '/';

            // console.log('Iteration: ' + i)
            console.log('Filename: ' + fname)
            console.log('Artist: ' + fl[i])
            console.log('Atrist Folder : ' + pathDir);
            dirs.push(pathDir);
            console.log('pathDir: ' + pathDir)
            fnames.push(fname);
            console.log('Fname: ' + fname)
            let songs = fs.readdirSync(pathDir, 'utf-8')
            sngs.push(songs + " ")
            console.log('songs: ' + songs)
            fs.writeFile(fname, songs, function (err) {
                if (err) console.log(err);
                console.log('Writing2..' + songs)
            })

            console.log('//////////////////////////////////////')
        }
        for (var t = 0; t < dirs.length; t++) {
           currnetalbum =  fs.readdirSync(dirs[t], function (err, al) {
                if (err) console.log(err)
                console.log('AL: ' + al)  
            })
            albums.push(currnetalbum)
            console.log('dirs[t] : ' + dirs[t] + ' t ' + t)
            console.log("CIEKAWE CO : " + albums)
        }
        console.log("CIEKAWE CO : " + albums[1])
        console.log('dirs: ' + dirs)
        console.log('siz ' + siz)
      


    })


    fs.writeFile('public/artist.txt', fl, function (err) {
        if (err) console.log(err);

        console.log('end of loop: ' + fl)

    })

    return res.redirect('/public/index.html')

})

app.get('/music', function (req, res) {
    var fileId = req.query.id;
    var artist = req.query.artist;
    var album = req.query.album;
    album = album.replace(/_/g, " ")
    console.log(album);
    var file = __dirname + '/music/' + artist + '/' + album + '/' + fileId;
    fs.exists(file, function (exists) {
        if (exists) {
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            console.log('ERROR 404 not found ')
            res.send('its 404');
            res.end();
        }
    })
});


app.get('/download', function (req, res) {
    var fileId = req.query.id;
    var file = __dirname + '/music/' + fileId;
    fs.exists(file, function (exists) {
        if (exists) {
            res.setHeader('Content-disposition', 'attachment; filename' + fileId)
            res.setHeader('Content-Type', 'application/audio/mp3')
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);

        } else {
            res.send('its 404');
            res.end();
        }
    })
})
app.get('/songs', function (req, res) {
    console.log(__dirname + '/songs.txt')
    var rd = fs.createReadStream(__dirname + '/public/songs.txt');
    rd.pipe(res)
})



app.listen(3003, function () {
    console.log('listening on 3003');
})