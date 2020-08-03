//
// var songHTMLSections = [];
// var albumPlaylists = [];
// var playlistContainer = document.getElementById('amplitude-right')
// var songDataObjs;
// var amplitudeDataObjs;
// var rawJSON;
// var headerNames;
// var headerCells;
// var cells;
// var currentPlayListIndex = 0;
// var albumObjs;
//
// var activeSongContainer;
//
// const songDataSheetURL = 'https://spreadsheets.google.com/feeds/cells/1A5fo1IWGw-XkjIqPXYb7sZfPvDIYMOv-vOwawq14ARo/1/public/full?alt=json'
// var rellx = new Rellax('.rellax')
// var granimInstance = new Granim({
//       element: '#gradientCanvas',
//       direction: 'top-bottom',
//       isPausedWhenNotInView: true,
//       states : {
//           "default-state": {
//               gradients: [
//                   ['#ff9966', '#ff5e62'],
//                   ['#00F260', '#0575E6'],
//                   ['#e1eec3', '#f05053']
//               ]
//           }
//       }
//   });
//
// var songDataObjs = generateObjectFromSpreadData(songDataSheetURL).then(function(returnData){
//     songDataObjs = returnData;
//     let albumNameColumn = getAllValuesInColumn(headerCells, cells, 'album', true)
//     let uniqueAlbumNames = albumNameColumn.filter(onlyUnique)
//     let testName = uniqueAlbumNames[0]
//     let testGroup = groupBy(songDataObjs, obj => obj.album)
//     var progressArray = []
//     let referenceProgressBar = document.getElementById('song-played-progress');
//     console.log('REFERENCEPROGRESSBAR', referenceProgressBar)
//     albumObjs =  makeAlbumObjs(testGroup, document.querySelector('#allPlaylistsContainer'))
//     amplitudeDataObjs = generateAmpltiudeDataObjArray(albumObjs)
//     // console.log('AMPLITUDEDATAOBJS', amplitudeDataObjs)
//     amplitudeDataObjs.callbacks = {
//       play: function(e){
//         let activeSongMetaData = Amplitude.getActiveSongMetadata()
//         let activeSongIndex = activeSongMetaData.index
//         let activeBackgroundProgressBar = document.getElementById('songProgressBackground_'+activeSongIndex);
//         let referenceProgressBar = document.getElementById('song-played-progress');
//         progressArray.push(activeBackgroundProgressBar)
//         // $(activeBackgroundProgressBar).animate({'left': '-90%'}, 1000, 'easeOutCirc', function(){
//         //   console.log('finished aniamte ');
//         // })
//         setInterval(function(){
//           // let referenceProgressBar = document.getElementById('song-played-progress');
//           let percentage = convertToPercentage(referenceProgressBar.value, -90)
//             $(activeBackgroundProgressBar).css('left', percentage )
//         }, 50)
//
//         if (progressArray.length > 1){
//           $(progressArray[0]).removeClass('activeSongProgressBackground')
//           $(progressArray[1]).addClass('activeSongProgressBackground')
//
//           progressArray = progressArray.slice(1)
//           // setInterval(function(){
//           //   // let referenceProgressBar = document.getElementById('song-played-progress');
//           //   let percentage = convertToPercentage(referenceProgressBar.value, -90)
//           //     $(progressArray[1]).css('left', percentage )
//           //     // console.log('PERCENTAGE', percentage)
//           // }, 50 )
//         } else {
//           activeBackgroundProgressBar.addClass('activeSongProgressBackground')
//             setInterval(function(){
//                 // let referenceProgressBar = document.getElementById('song-played-progress');
//               console.log(referenceProgressBar.value);
//               let percentage = convertToPercentage(referenceProgressBar.value, -90)
//               $(activeBackgroundProgressBar).css('left', percentage )
//               // console.log('PERCENTAGE', percentage)
//             }, 50 )
//         }
//
//
//
//
//
//
//       }
//     }
//     amplitudeSetup(amplitudeDataObjs)
//
// });
// let last_known_scroll_position = 0;
// let ticking = false;
// //
// // function doSomething(scroll_pos) {
// //   // Do something with the scroll position
// //   document.querySelector('#allPlaylistsContainer').style.transform = 'translateX(' + scroll_pos + '%)';
// // }
// // $(window).on("scroll", function() {
// //   var wScroll = ($(this).scrollTop() / $(window).height()) + 50;
// //   $('#allPlaylistsContainer').css({
// //     'transform': 'translate(-50%, -' + (wScroll) + '%)'
// //   })
// // });
//
// function convertToPercentage(val, start){
//   let percentage = (start + (val*100)) + '%'
//   return percentage
// }
//
// function switchPlaylist(e){
//   console.log('CLIKED ID', e.id);
//   if (e.id === 'nextButton') {
//     currentPlayListIndex++;
//   } else {
//     currentPlayListIndex--;
//   }
//   currentAlbumObj = albumObjs[currentPlayListIndex]
//   // toScrollTo = currentAlbumObj.albumSceneContainer.
//   toScrollTo = albumObjs[currentPlayListIndex].albumPlaylistContainer.parentNode
//   console.log(albumObjs);
//   // console.log('TOSCROLLTO', toScrollTo)
//   // $('.leftArrow').click(function(event){
//     // event.preventDefault();
//   // $('#allPlaylistsContainer').animate({scrollLeft:'+=1500'},500);
//
//   // console.log(currentPlayListIndex);
//     $('body').scrollTo(toScrollTo, 500, {
//       axis: 'x',
//       margin: false
//   })
// }
//
// function groupBy(list, keyGetter) {
//     const map = new Map();
//     list.forEach((item) => {
//          const key = keyGetter(item);
//          const collection = map.get(key);
//          if (!collection) {
//              map.set(key, [item]);
//          } else {
//              collection.push(item);
//          }
//     });
//     return map;
// }
//
// function makeAlbumObjs(mapGroup, parentElem){
//   let array = Array.from(mapGroup)
//   let groupObjArray = []
//
//
//   for (var i = 0; i < array.length; i++) {
//     let curTempAlbumData = array[i]
//     let albumSceneContainer = createClassIdAppend(parentElem, 'div', 'albumSceneContainer', 'albumSceneContainer_'+i)
//     let playlistContainer = createClassIdAppend(albumSceneContainer, 'div', 'albumPlaylistContainer amplitudeRight', 'albumPlaylistContainer_'+i)
//     let progressBar = createClassIdAppend(playlistContainer, 'progress', 'amplitude-song-played-progress', 'song-played-progress')
//     progressBar.setAttribute('data-amplitude-playlist', 'WEIRD NXC - ACT 1')
//     // let playlistTexture = createClassIdAppend(playlistContainer, 'img', 'playlistTexture')
//     // setElemAttribute(playlistTexture, 'src', 'data/textures/glasstexture1.png')
//     let albumPlaylist = generatePlaylist(playlistContainer, curTempAlbumData)
//     let randomColor2 = getRandomColor()
//     $(playlistContainer).css('background-color', 'rgba(255, 255, 255, 0)')
//     $(albumSceneContainer).css('background-color', 'rgba(255, 255, 255, 0)')
//     let albumObj = {
//       'albumName': curTempAlbumData[0],
//       'albumSongObjs': curTempAlbumData[1],
//       'albumSceneContainer': albumSceneContainer,
//       'albumPlaylistContainer': playlistContainer
//     }
//     groupObjArray.push(albumObj)
//   }
//   return groupObjArray
// }
//
// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }
//
// function getAllValuesInColumn(theHeaderCells, theSheetCeels, columnName, ignoreHeader){
//   var desiredHeaderCell = theHeaderCells.filter(obj => {
//       return obj.content.$t  === columnName
//   })
//   let headerColumnName = desiredHeaderCell[0].gs$cell.col
//   let columnCells = theSheetCeels.filter(test => {
//       return test.gs$cell.col  === headerColumnName
//   })
//   let desiredColumnValues = columnCells.map(a=>a.content.$t)
//
//   if (ignoreHeader == true) {
//     desiredColumnValues.shift()
//   }
//   return desiredColumnValues;
// }
//
// function sortObjectsBasedOnValue(){
//   let key = onlyUnique()
// }
//
// // console.log('SONGDATAOBJS', songDataObjs)
// // cl
// function makeSongContainer(parentElem, index) {
//   let songContainer = createClassIdAppend(parentElem, 'div', "song amplitude-song-container amplitude-play-pause", 'songContainer_'+index)
//   let songNowPlayingIconContainer = createClassIdAppend(songContainer,'div', 'song-now-playing-icon-container', 'songNowPlayingIconContainer'+index)
//   let playButtonContainer = createClassIdAppend(songNowPlayingIconContainer, 'div', 'play-button-container', 'playButtonContainer_'+index)
//   let nowPlaying = createClassIdAppend(songNowPlayingIconContainer, 'img', 'now-playing', 'nowPlaying_'+index)
//
//   let songMetaData = createClassIdAppend(songContainer, 'div', 'song-meta-data', 'songMetaData_'+index)
//   let songTitle = createClassIdAppend(songMetaData, 'a', 'song-title', 'songTitle_'+index)
//   let songArist = createClassIdAppend(songMetaData, 'span', 'song-artist', 'songArist_'+index)
//
//   let bandcampLink = createClassIdAppend(songContainer, 'a', 'bandcamp-link', 'bandcampLink_'+index)
//   let bandcampGray = createClassIdAppend(bandcampLink, 'img', 'bandcamp-grey', 'bandcampGray_'+index)
//   let bandcampWhite = createClassIdAppend(bandcampLink, 'img', 'bandcamp-white', 'bandcampWhite_'+index)
//
//   let songDuration = createClassIdAppend(songContainer, 'span', 'song-duration', 'songDuration_'+index)
//
//   let songProgressBackground = createClassIdAppend(songContainer, 'div', 'songProgressBackground', 'songProgressBackground_'+index)
//   // $(songProgressBackground).toggleClass('songProgressBackground')
//   let songContainerObj = {
//      'songContainer':songContainer,
//      'songNowPlayingIconContainer': songNowPlayingIconContainer,
//      'playButtonContainer': playButtonContainer,
//      'nowPlaying': nowPlaying,
//      'songMetaData': songMetaData,
//      'songTitle': songTitle,
//      'songArist': songArist,
//      'bandcampLink': bandcampLink,
//      'bandcampGray': bandcampGray,
//      'bandcampWhite': bandcampWhite,
//      'songDuration': songDuration
//   }
//   return songContainerObj;
// }
//
// function generateSongURLString(dObj, songIndex, albumNum){
//   let songNum = leadingZero(songIndex)
//   let artistName = generateArtistText(dObj)
//   let dash = '-'
//   let songName = ([songNum, artistName, dash, dObj.name].join(' '))+'.mp3'
//   let albumFolder = 'album'+albumNum
//   let songAddress = ['data', albumFolder, songName].join('/')
//   let encoded = encodeURI(songAddress)
//   return encoded
// }
//
// function generateArtistText(dObj){
//   let artistNameString
//   if (dObj.collab_symbol !== 'NA') {
//     artistNameString = [dObj.artist1, dObj.collab_symbol, dObj.artist2].join(' ')
//   } else {
//     artistNameString = dObj.artist1
//   }
//   return artistNameString
// }
//
// function leadingZero(num){
//   numPlus = num+1;
//   let formattedNum
//   if(numPlus.toString().length < 2){
//    formattedNum= "0"+numPlus;
//  } else {
//    formattedNum = numPlus
//  }
//  return formattedNum
// }
// // /data/album0/04%20「%20P%20H%20Y%20S%20A%20」-%20w0nd3rful.mp3
// // 04%20%E3%80%8C%20P%20H%20Y%20S%20A%20%E3%80%8D%20-%20w0nd3rful.mp3
//
// function generateAmpltiudeDataObjArray(albums){
//  var playListObj = {}
//  let testFinal = {}
//
//   for (var i = 0; i < 1; i++) {
//       let curAlbum = albums[i]
//       let curSongObjs = curAlbum.albumSongObjs
//       let albumSongPlaylist = []
//       for (var j = 0; j < curSongObjs.length; j++) {
//          let amplitudeDataObjArray = []
//          let curSong = curSongObjs[j]
//          let songLocation = generateSongURLString(curSong, j, i)
//          console.log('SONGLOCATION', songLocation)
//
//          let ampDO = {
//            'name': curSong.name,
//            'artist': generateArtistText(curSong),
//            'album': curSong.album,
//            'url': songLocation,
//            // 'url': 'data/album0/04%20「%20P%20H%20Y%20S%20A%20」-%20w0nd3rful.mp3',
//            // 'url': 'data/album0/04%20%E3%80%8C%20P%20H%20Y%20S%20A%20%E3%80%8D%20-%20w0nd3rful.mp3',
//            'cover_art_url': curSong.cover_art_url
//          }
//          albumSongPlaylist.push(ampDO)
//        }
//        let songsObj = {
//          'songs': albumSongPlaylist
//        }
//        playListObj[curAlbum.albumName] = songsObj
//
//        testFinal.playlists = playListObj
//
//    }
//   // finalAmplitudeObj.playlists = playListObj
//   return testFinal
// }
//
// function amplitudeSetup(dataObjs){
//   let bandcampLinks = document.getElementsByClassName('bandcamp-link');
//
//   for( var i = 0; i < bandcampLinks.length; i++ ){
//     bandcampLinks[i].addEventListener('click', function(e){
//         e.stopPropagation();
//     });
//   }
//
//
//   let songElements = document.getElementsByClassName('song');
//
//   for( var i = 0; i < songElements.length; i++ ){
//     /*
//
//         Ensure that on mouseover, CSS styles don't get messed up for active songs.
//     */
//     songElements[i].addEventListener('mouseover', function(){
//         // this.style.backgroundColor = '#00A0FF';
//         // console.log(i);
//         // console.log('got hovered');
//         $(this).toggleClass('myGradientFill')
//         this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
//         this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';
//
//         if( !this.classList.contains('amplitude-active-song-container') ){
//             this.querySelectorAll('.play-button-container')[0].style.display = 'block';
//         }
//
//         this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'none';
//         this.querySelectorAll('img.bandcamp-white')[0].style.display = 'block';
//         this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
//     });
//       // console.log(e);
//       // console.log(this);
//     // });
//
//
//     /*
//         Ensure that on mouseout, CSS styles don't get messed up for active songs.
//     */
//     songElements[i].addEventListener('mouseout', function(){
//         $(this).toggleClass('myGradientFill')
//         this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
//         this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
//         this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
//         this.querySelectorAll('.play-button-container')[0].style.display = 'none';
//         this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'block';
//         this.querySelectorAll('img.bandcamp-white')[0].style.display = 'none';
//         this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
//     });
//
//     /*
//         Show and hide the play button container on the song when the song is clicked.
//     */
//     songElements[i].addEventListener('click', function(){
//         this.querySelectorAll('.play-button-container')[0].style.display = 'none';
//     });
//   }
//
//   /*
//     Initializes AmplitudeJS
//   */
//   Amplitude.init(dataObjs)
// }
//
// function generatePlaylist(parentElem, albumDataArray) {
//   let albumSongArray = albumDataArray[1]
//   let albumName = albumDataArray[0]
//   for (var i = 0; i < albumSongArray.length; i++) {
//     let curSongDataObj = albumSongArray[i]
//     let curSongHTMLObj =  makeSongContainer(parentElem,i)
//     setSongHTMLObjContent(curSongHTMLObj, curSongDataObj, i, albumName)
//     songHTMLSections.push(curSongHTMLObj)
//   }
// }
//
// function setSongHTMLObjContent(hObj, dObj, index, albumName){
//   console.log('ALBUMNAME', albumName)
//
//   // console.log('DOBJ', dObj)
//   setElemAttribute(hObj.songContainer, 'data-amplitude-song-index', index)
//   $(hObj.songContainer).attr('data-amplitude-playlist', albumName)
//   setElemAttribute(hObj.nowPlaying, 'src', 'https://521dimensions.com/img/open-source/amplitudejs/blue-player/now-playing.svg')
//   $(hObj.songContainer).attr('data-amplitude-song-index', index)
//   let artistName = generateArtistNameString(dObj)
//   setElemAttribute(hObj.songTitle, 'innerHTML', dObj.name)
//
//   setElemAttribute(hObj.songArist, 'innerHTML', artistName)
//   setElemAttribute(hObj.bandcampLink, 'href', dObj.Artist_Link)
//   setElemAttribute(hObj.songDuration, 'innerHTML', dObj.Song_Duration)
//
//   setElemAttribute(hObj.bandcampLink, 'target', '_blank')
//   setElemAttribute(hObj.bandcampGray, 'src','https://521dimensions.com/img/open-source/amplitudejs/blue-player/bandcamp-grey.svg')
//   setElemAttribute(hObj.bandcampWhite, 'src','https://521dimensions.com/img/open-source/amplitudejs/blue-player/bandcamp-white.svg')
//
// }
//
// function generateArtistNameString(dObj){
//   let artistNameString
//   if (dObj.collab_symbol !== 'NA') {
//     artistNameString = [generateArtistLink(dObj, dObj.artist1, dObj.artist1_Link), dObj.collab_symbol, generateArtistLink(dObj, dObj.artist2, dObj.artist2_Link )].join(' ')
//   } else {
//     artistNameString = generateArtistLink(dObj, dObj.artist1, dObj.artist1_Link)
//   }
//   return artistNameString
// }
//
// function generateObjectFromSpreadData(url) {
//     // const response = await fetch('')
//     let myCellContentArr = []
//     let finalProjObs = []
//     let starts = []
//     let ranges = []
//     let testProjArray = []
//
//     return $.getJSON(url).then(function(data) {
//       rawJSON = data;
//       cells = data.feed.entry;
//       // console.log('CELLS', cells)
//       let numRows = parseInt(data.feed.gs$rowCount.$t)
//       let numCols = parseInt(data.feed.gs$colCount.$t)
//       let totalNumCels = numRows * numCols;
//
//       for (var i = 0; i < numRows; i++) {
//         let range = numCols * i;
//         starts.push(range)
//       }
//
//       for (var i = 0; i < starts.length; i++) {
//         let curStart = starts[i]
//         let curRange = []
//         curRange[0] = curStart
//         curRange[1] = curStart + numCols
//         ranges.push(curRange)
//       }
//
//       for (var i = 0; i < ranges.length; i++) {
//         let curRange = ranges[i]
//         let projArray = cells.slice(curRange[0], curRange[1])
//         let contentArray = []
//         for (var j = 0; j < projArray.length; j++) {
//           let curCell = projArray[j]
//           let curContent = curCell.content.$t;
//           contentArray.push(curContent)
//         }
//         myCellContentArr.push(contentArray)
//       }
//
//       for (var i = 0; i < cells.length; i++) {
//         let curCell = cells[i]
//       }
//
//       headerCells = cells.filter(obj => {
//         return obj.gs$cell.row === "1"
//       })
//
//       headerNames = headerCells.map(a => a.content.$t)
//       let testObj = {}
//       for (var i = 1; i < myCellContentArr.length; i++) {
//         let curContentArray = myCellContentArr[i]
//         let contentObjHolder = {}
//         for (var j = 0; j < headerNames.length; j++) {
//           let curPropToAdd = headerNames[j]
//           contentObjHolder[curPropToAdd] = curContentArray[j]
//
//         }
//         finalProjObs.push(contentObjHolder)
//       }
//
//       return finalProjObs
//     })
// }
// //babylon
// function positionObjects(objects, position){
//
// }
// function initializeLights(myScene){
//   var reflectionTexture = new BABYLON.HDRCubeTexture("./textures/environment.hdr", myScene, 128, false, true, false, true);
//   var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), myScene);
//   var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), myScene);
// }
//
// function initializeParticleSystem(myScene, size, emitRate){
//
//   var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);
//
//   particleSystem.particleTexture = new BABYLON.Texture("data/textures/cloudTest.png", scene);
//   particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
//   // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
//   // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
//   particleSystem.addDragGradient(0, 0.5)
//   particleSystem.minLifetime = 0.3;
//   particleSystem.maxLifeTime = 400;
//   particleSystem.addSizeGradient(10.0, 1);
//   // particleSystem.minSize = 0.00001;
//   // particleSystem.maxSize = 0.001;
//   particleSystem.minSize = 1;
//   particleSystem.maxSize = 10;
//   particleSystem.minEmitPower = 1;
//   particleSystem.maxEmitPower = 10;
//   // particleSystem.addStartSizeGradient(0, 2);
//   // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
//   // particleSystem.emitRate = emitRate
//   particleSystem.emitter = new BABYLON.Vector3(0, -15, 0); // the starting object, the emitter
//   particleSystem.minEmitBox = new BABYLON.Vector3(-1*size, -1*size, -1*size); // Starting all from
//   particleSystem.maxEmitBox = new BABYLON.Vector3(size, size, size); // To...
//   particleSystem.start();
// }
//
// function dynamicCanvasMaterial(canvasSourceElement, myScene ) {
//   var texture = new BABYLON.DynamicTexture("dynamic texture", canvasSourceElement, scene);
//   var textureContext = texture.getContext('2d');
//   var mat = new BABYLON.StandardMaterial("mat", myScene);
//   mat.emissiveTexture = texture;
//   setInterval(function(){
//     texture.update()
//   }, 10)
//   return mat;
// }
//
// function initializeCamera(myScene, enableArc) {
//   if (enableArc == true) {
//       var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), myScene);
//   } else {
//       var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,0,5), myScene);
//       camera.setTarget(BABYLON.Vector3.Zero());
//   }
//
//
//   var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
//       // edge_blur: 1.0,
//       // chromatic_aberration: .1,
//       // distortion: 1.0,
//       // dof_focus_distance: 6,
//       // dof_aperture: 6.0,			// set this very high for tilt-shift effect
//       // grain_amount: 0.1,
//       // dof_pentagon: true,
//       // dof_gain: 1.0,
//       // dof_threshold: 1,
//       // dof_threshold: .1,
//       // dof_darken: 0.25
//     }, myScene, 1.0, camera
//   );
//   return camera;
// }
//
// function generateSphere(myScene, options, material){
//   let generatedSphere = BABYLON.MeshBuilder.CreateSphere("sphere", options, myScene);
//   generatedSphere.material = material;
//   return generatedSphere;
// }
//
// function generateAnimation(obj, myScene){
//       var animationTorus = new BABYLON.Animation("torusEasingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
//       // let startPos = obj.position
//       // the torus destination position
//       var nextPos = obj.position.add(new BABYLON.Vector3(0, 2, 0));
//
//       // Animation keys
//       var keysTorus = [];
//       keysTorus.push({ frame: 0, value: obj.position });
//       keysTorus.push({ frame: 120, value: nextPos });
//       keysTorus.push({ frame: 200, value: obj.position });
//       animationTorus.setKeys(keysTorus);
//
//       // Adding an easing function
//       // You can use :
//       //1.	CircleEase()
//       //2.	BackEase(amplitude)
//       //3.	BounceEase(bounces, bounciness)
//       //4.	CubicEase()
//       //5.	ElasticEase(oscillations, springiness)
//       //6.	ExponentialEase(exponent)
//       //7.	PowerEase(power)
//       //8.	QuadraticEase()
//       //9.	QuarticEase()
//       //10.	QuinticEase()
//       //11.	SineEase()
//       // And if you want a total control, you can use a Bezier Curve animation
//       //12.   BezierCurveEase(x1, y1, x2, y2)
//       var easingFunction = new BABYLON.CircleEase();
//
//       // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
//       easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
//
//       // Adding easing function to my animation
//       animationTorus.setEasingFunction(easingFunction);
//
//       // Adding animation to my torus animations collection
//       obj.animations.push(animationTorus);
//
//       //Finally, launch animations on torus, from key 0 to key 120 with loop activated
//       myScene.beginAnimation(obj, 0, 200, true);
// }
//
// function setSceneCameraToGlbCamera(glb, myScene){
//   let testCam = glb.cameras[0]
//   myScene.activeCamera = testCam;
// }
//
// function assignColor(obj, color, myScene){
//    let toAssignMat = new BABYLON.StandardMaterial('matName', myScene)
//    toAssignMat.diffuseColor = new BABYLON.Color3(color)
//    obj.material = toAssignMat
//
// }
//
// function attachPointerDragBehavior(obj, myHighlightLayer){
//   console.log('OBJ', obj)
//   let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragAxis: new BABYLON.Vector3(0,1,0)});
//   // let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragAxis: new BABYLON.Vector3(1,0,1)});
//   // let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(1,0,1)});
//   // let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0,1,1)});
//   // let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(1,1,0)});
//   // let pointerDragBehaviorToAdd = new BABYLON.PointerDragBehavior({dragAxis: new BABYLON.Vector3(0,1,1)});
//   pointerDragBehaviorToAdd.useObjectOrienationForDragging = false;
//  pointerDragBehaviorToAdd.moveAttached = false;
//   // Use drag plane in world space
//   pointerDragBehaviorToAdd.useObjectOrientationForDragging = false;
//
//   //START
//   pointerDragBehaviorToAdd.onDragStartObservable.add((event)=>{
//       myHighlightLayer.addMesh(obj, BABYLON.Color3.Green());
//   })
//
//   //DRAG
//   pointerDragBehaviorToAdd.onDragObservable.add((event)=>{
//       obj.position.x += event.delta.x
//       obj.position.y += event.delta.y
//       obj.position.z += event.delta.z
//   })
//   //END
//   pointerDragBehaviorToAdd.onDragEndObservable.add((event)=>{
//       myHighlightLayer.removeMesh(obj)
//   })
//   obj.addBehavior(pointerDragBehaviorToAdd)
//
// }
//
// var canvas = document.getElementById("mainCanvas"); // Get the canvas element
//         var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
//
//         /******* Add the create scene function ******/
//         var createScene = function () {
//             var pbS = 10;
//             var scene = new BABYLON.Scene(engine);
//              var hl = new BABYLON.HighlightLayer("hl1", scene);
//             var camera = initializeCamera(scene, true)
//             initializeLights(scene)
//             // initializeParticleSystem(scene, 5, 1000)
//             let test = document.getElementById('gradientCanvas')
//             console.log('TEST', test)
//             canvasGradientMaterial = dynamicCanvasMaterial(document.getElementById('gradientCanvas'), scene)
//
//             var testObj;
//             let testSphere = generateSphere(scene, {diameter: 2})
//             testSphere.position = new BABYLON.Vector3(0,3,0)
//             attachPointerDragBehavior(testSphere)
//             assignColor(testSphere, '(1,1,1)', scene)
//             // generateAnimation(testSphere, scene)
//
//             // var backgroundPlane = BABYLON.MeshBuilder.CreatePlane("plane", {height:10, width: 10}, scene);
//             // var backgroundPlane = BABYLON.MeshBuilder.CreatePlane("plane", {height:1, width: 1}, scene);
//             // backgroundPlane.material = canvasGradientMaterial
//             // backgroundPlane.material = blackMat
//             // var backgroundPlane;
//
//             // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:5}, scene);
//             // BABYLON.SceneLoader.Append("data/3D_Models/", "fence.glb", scene, function (added) {
//
//             BABYLON.SceneLoader.Append("data/3D_Models/", "testScene1.glb", scene, function (added) {
//               // console.log('ADDED', added)
//               testObj = added.meshes[2]
//
//               for (var i = 0; i < added.meshes.length; i++) {
//               }
//               setSceneCameraToGlbCamera(added, scene)
//               assignColor(testObj, '(1,0,1)', scene)
//
//             });
//
//             document.querySelector('#mainCanvas').addEventListener('click', function(evt){
//               var pickResult = scene.pick(evt.clientX, evt.clientY);
//               let curPickedMesh = pickResult.pickedMesh;
//               attachPointerDragBehavior(curPickedMesh, hl)
//               // console.log(pickResult);
//             });
//
//             scene.clearColor = new BABYLON.Color4(0,0,0,0)
//             return scene;
//         };
//
//         var scene = createScene(); //Call the createScene function
//
//         engine.runRenderLoop(function () {
//
//             scene.render();
//         });
//         function controlOffset(){
//
//         }
//         // Watch for browser/canvas resize events
//         window.addEventListener("resize", function () {
//                 engine.resize();
//         });
//
//
// // utils
// function generateArtistLink(dObj, artistName, artistLink) {
//     generatedString = '<a' + ' target=' + '_blank' + ' ' + 'href=' + artistLink + '>' + artistName + '</a>'
//     return generatedString
// }
//
// function setElemAttribute(elem, attr, content) {
//   elem[attr] = content
// }
//
// function createClassIdAppend(parentElem, htmlType, className, idName) {
//
//       let testPar = parentElem
//       let elementToAdd = document.createElement(htmlType);
//       elementToAdd.setAttribute('class', className);
//       elementToAdd.setAttribute('id', idName);
//       if (testPar == null) {
//         return;
//       }
//       testPar.appendChild(elementToAdd);
//       return elementToAdd;
//   }
//   // </div>
//
// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
