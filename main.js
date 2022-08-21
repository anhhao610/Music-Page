const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const song = $('.song')
const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const progressBar = $('.progress-bar')
const preBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random i')
const vnBtn = $('.vn-song-btn')
const vn2Btn = $('.vn2-song-btn')
const lofiBtn = $('.lofi-song-btn')
const repeatBtn = $('.btn-repeat i')
const volumeIcon = $('.volume-icon')
const volumeBar = $('.volume-bar')
const volumeOn = $('.volume-on')
const volumeOff = $('.volume-off')
const volumeBtn = $('.click-volume')
const PLAYER_STORAGE_KEY = 'HAO_PLAYER'

let randomArray = []
let isHoldingVolume = false;

// Sound wave strokes
const strokes = `
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
   <span class="stroke"></span>
`
let isHoldingProgress = false

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    volumeOff: false,
    currentList: 'vn',
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: {
    vn: [
        {
            name: 'Giản đơn',
            singer: 'NHA ft Ry2c',
            path: './assets/music/Gian-don.mp4',
            image: './assets/img/gian-don.png',
        },
        {
            name: 'Đừng là gì cả',
            singer: 'NHA',
            path: './assets/music/Dung-la-gi-ca.mp4',
            image: './assets/img/dung-la-gi-ca.png',
        },
        {
            name: 'Nếu không thể yêu thì ta cũng sẽ từng là bạn',
            singer: 'NHA',
            path: './assets/music/Khong-the-yeu-thi-ta-se-tung-la-ban.mp4',
            image: './assets/img/khong-the-yeu-thi-ta-se-tung-la-ban.png',
        },
        {
            name: 'Ngoài ô cửa sổ! Có mưa',
            singer: 'NHA ft Ái',
            path: './assets/music/Ngoai-o-cua-so-co-mua.mp4',
            image: './assets/img/ngoai-o-cua-so-co-mua.png',
        },
        
        {
            name: 'Ngoại lệ của anh',
            singer: 'Mad.P ft NHA',
            path: './assets/music/Ngoai-le-cua-anh.mp4',
            image: './assets/img/ngoai-le-cua-anh.png',
        },
        {
            name: 'Dừng lại',
            singer: 'NHA',
            path: './assets/music/Dung-lai.mp4',
            image: './assets/img/dung-lai.png',
        },
        {
            name: 'Luyến',
            singer: 'NHA ft MDr',
            path: './assets/music/Luyen.mp4',
            image: './assets/img/luyen.png',
        },
        {
            name: 'Cỏ gió và mây',
            singer: 'NHA ft Kim Nguyễn',
            path: './assets/music/Co-gio-va-may.mp4',
            image: './assets/img/co-gio-va-may.png',
        }
    ],
    vn2: [
        {
            name: 'Giản đơn',
            singer: 'NHA ft Ry2c',
            path: './assets/music/Gian-don.mp4',
            image: './assets/img/gian-don.png',
        },
        {
            name: 'Đừng là gì cả',
            singer: 'NHA',
            path: './assets/music/Dung-la-gi-ca.mp4',
            image: './assets/img/dung-la-gi-ca.png',
        },
        {
            name: 'Nếu không thể yêu thì ta cũng sẽ từng là bạn',
            singer: 'NHA',
            path: './assets/music/Khong-the-yeu-thi-ta-se-tung-la-ban.mp4',
            image: './assets/img/khong-the-yeu-thi-ta-se-tung-la-ban.png',
        },
        {
            name: 'Ngoài ô cửa sổ! Có mưa',
            singer: 'NHA ft Ái',
            path: './assets/music/Ngoai-o-cua-so-co-mua.mp4',
            image: './assets/img/ngoai-o-cua-so-co-mua.png',
        },
        
        {
            name: 'Ngoại lệ của anh',
            singer: 'Mad.P ft NHA',
            path: './assets/music/Ngoai-le-cua-anh.mp4',
            image: './assets/img/ngoai-le-cua-anh.png',
        },
        {
            name: 'Dừng lại',
            singer: 'NHA',
            path: './assets/music/Dung-lai.mp4',
            image: './assets/img/dung-lai.png',
        },
        {
            name: 'Luyến',
            singer: 'NHA ft MDr',
            path: './assets/music/Luyen.mp4',
            image: './assets/img/luyen.png',
        },
        {
            name: 'Cỏ gió và mây',
            singer: 'NHA ft Kim Nguyễn',
            path: './assets/music/Co-gio-va-may.mp4',
            image: './assets/img/co-gio-va-may.png',
        }
    ],
    lofi: [
        {
            name: 'Breath Taking',
            singer: 'Purrple Cat',
            path: './assets/music/Breathtaking.mp3',
            image: './assets/img/lofi-1.jpg',
        },
        {
            name: 'Morning Routine',
            singer: 'Ghosttrifter Official',
            path: './assets/music/Morning-Routine.mp3',
            image: './assets/img/lofi-2.jpg',
        },
        {
            name: 'Heart Of The Ocean',
            singer: 'Purrple Cat',
            path: './assets/music/Heart-Of-The-Ocean.mp3',
            image: './assets/img/lofi-3.jpg',
        },
        {
            name: 'Embrace',
            singer: 'Sappheiros',
            path: './assets/music/Embrace.mp3',
            image: './assets/img/lofi-4.jpg',
        },
        
        {
            name: 'Wild Strawberry',
            singer: 'Purrple Cat',
            path: './assets/music/Wild-strawberry.mp3',
            image: './assets/img/lofi-5.jpg',
        },
        {
            name: 'Missing You',
            singer: 'Purrple Cat',
            path: './assets/music/Missing-You.mp3',
            image: './assets/img/lofi-6.jpg',
        },
        {
            name: 'Fragile',
            singer: 'Keys of Moon',
            path: './assets/music/Fragile.mp3',
            image: './assets/img/lofi-7.jpg',
        },
        {
            name: 'And So It Begins',
            singer: 'Artificial.Music',
            path: './assets/music/And-So-It-Begins.mp3',
            image: './assets/img/lofi-8.jpg',
        },
        {
            name: 'Bedtime After A Coffee',
            singer: 'Keys of Moon',
            path: './assets/music/Bedtime-after-a-coffee.mp3',
            image: './assets/img/lofi-9.jpg',
        },
        {
            name: 'Floating Castle',
            singer: 'Purrple Cat',
            path: './assets/music/Floating-castle.mp3',
            image: './assets/img/lofi-10.jpg',
        }
    ],
    },

    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    // Setting timer format
    timerFormat(duration) {
       const rounded = Math.floor(duration);
       return `${Math.floor(rounded / 60) >= 10 ? Math.floor(rounded / 60) : '0' + Math.floor(rounded / 60)}:${rounded % 60 >= 10 ? rounded%60 : '0' + rounded%60}`;
    },

    //Render danh sách bài hát
    render: function() {
        const htmls = this.songs[this.currentList].map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <audio class="duration-display" preload="metadata" src=${song.path}></audio>
                    <div class="wave"></div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h icon-option"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
        const durations = $$('.duration-display');
        const wave = $$('.wave');

      // Trạng thái đang hát và thời lượng bài hát
        durations.forEach((duration, index) => {
            duration.onloadedmetadata = () => {
            wave[index].innerHTML = index === this.currentIndex ? strokes : this.timerFormat(duration.duration);
            }
        })

    },
    //Hàm định nghĩa thuộc tính cho object
    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentList][this.currentIndex]
            }
        })
    },

    // Function runs every time song change event happens
    setChangeSong(newIndex) {
        $$('.wave')[this.currentIndex].innerHTML = this.timerFormat($$('.duration-display')[this.currentIndex].duration);
        this.currentIndex = newIndex;
        $$('.wave')[this.currentIndex].innerHTML = strokes;
    },

    //Hàm lắng nghe và xử lí các điều kiện
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay và dừng bằng kĩ thuật animate .animate([{animate},{cách animate hoạt động}])
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 7000, //quay bao lâu giây
            iterations: Infinity//số lần lặp
        })
        cdThumbAnimate.pause()

        // Updates song's duration when audio's metadata first update
        audio.onloadedmetadata = () => {
            $('#begin').innerText = this.timerFormat(audio.currentTime);
            $('#end').innerText = this.timerFormat(audio.duration);
        }

        // Volume change event
        audio.onvolumechange = () => {
            if (audio.volume <= 0) {
                volumeOn.classList.remove('active')
                volumeOff.classList.add('active')
            } else {
                volumeOff.classList.remove('active')
                volumeOn.classList.add('active')
            }
            $('.volume').style.width = `${audio.volume*100}%`
        }

        //Chạm vào icon loa 
        volumeBtn.onclick = function() {
            if (audio.volume > 0) {
                volumeOn.classList.remove('active')
                volumeOff.classList.add('active')
                audio.volume = 0
            } else {
                volumeOff.classList.remove('active')
                volumeOn.classList.add('active')
                audio.volume = 0.5
            }
        }

        volumeIcon.onclick = () => {
            audio.muted = !audio.muted;
        }

        // Mouse down event
        volumeBar.onmousedown = (e) => {
            isHoldingVolume = true;
            audio.volume = e.offsetX/e.target.offsetWidth;
        }

        // Dragging event
        volumeBar.onmousemove = (e) => {
            if(isHoldingVolume) audio.volume = e.offsetX/e.target.offsetWidth;
        }

        //Xử lý phóng to thu nhỏ đĩa CD
        document.onscroll = function() {
            const scrollTop = 
                window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            //Nếu newCdWidth lớn hơn 0 thì lấy nếu ko thì lấy 0
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 + 'px'
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi click nút play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //Khi bài hát được play
        audio.onplay = function() {
            _this.isPlaying = true
            cdThumbAnimate.play()
            player.classList.add('playing')
        }

        //Khi bài hát bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            cdThumbAnimate.pause()
            player.classList.remove('playing')
        }

        //Khi tiến độ bài hát thay đổi
        // audio.ontimeupdate = function() {
        //     if (audio.duration) {
        //         const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        //         progress.width = progressPercent
        //     } else {
        //         progress.width = 0
        //     }
        // }

        audio.ontimeupdate = () => {
            let progressBarWidth = (audio.currentTime/audio.duration)*100;
            $('#begin').innerText = this.timerFormat(audio.currentTime);
            $('.progress').style.width = `${progressBarWidth}%`;
         }

        //Xử lý khi tua bài hát
        // progress.oninput = function (e) {
        //     const seekTime = audio.duration / 100 * e.target.value
        //     audio.currentTime = seekTime
        // }
        progressBar.onmousedown = (e) => {
            isHoldingProgress = true;
            audio.currentTime = (e.offsetX/e.target.offsetWidth)*audio.duration;
        }

        progressBar.onmousemove = (e) => {
            if(isHoldingProgress) {
                audio.currentTime = (e.offsetX/e.target.offsetWidth)*audio.duration;
            }
        }

        window.onmouseup = () => {
            isHoldingProgress = false;
            isHoldingVolume = false;
        }

        //Khi next/random bài hát 
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        
        //Khi prev/random bài hát
        preBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        
        //Khi random bài hát
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Khi repeat bài hát
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        //Khi end bài hát
        audio.onended = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else if(_this.isRepeat) {
                audio.play()
            } else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Lắng nghe hành vi click vào playlist và 
        //trả về e.target(bài hát được click)
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            //Tránh ấn vào nút option, closest kiểm tra
            //nó hoặc thẻ cha nó,nếu không có trả về null
            if(songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
            }

            //Xử lý khi click vào song .option
            if(e.target.closest('.option')) {

            }
        }

         //xử lý đổi list bài hát
        vnBtn.onclick = function() {
            vn2Btn.classList.remove('active')
            lofiBtn.classList.remove('active')
            vnBtn.classList.add('active')
            _this.currentList = 'vn'
            _this.currentIndex = 0
            _this.loadCurrentSong()
            _this.render()
            audio.play()
            _this.scrollToActiveSong()
        } 
        vn2Btn.onclick = function() {
            vnBtn.classList.remove('active')
            lofiBtn.classList.remove('active')
            vn2Btn.classList.add('active')
            _this.currentList = 'vn2'
            _this.currentIndex = 0
            _this.loadCurrentSong()
            _this.render()
            audio.play()
            _this.scrollToActiveSong()
        }
        lofiBtn.onclick = function() {
            vnBtn.classList.remove('active')
            vn2Btn.classList.remove('active')
            lofiBtn.classList.add('active')
            _this.currentList = 'lofi'
            _this.currentIndex = 0
            _this.loadCurrentSong()
            _this.render()
            audio.play()
            _this.scrollToActiveSong()
        } 
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth', //kéo mượt
                block: 'center' //kéo theo chiều nào (gần nhất)
            })
        }, 200);
    },
    //Tải bài hát hiện tại vào UI(User Interface) khi chạy
    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    //load cấu hình
    loadConfig: function() {
        app.isRandom = this.config.isRandom
        app.isRepeat = this.config.isRepeat
        // Object.assign(this, this.config)
    },
    nextSong: function() {
        if(this.currentIndex === this.songs[this.currentList].length-1) {
            this.setChangeSong(0);
        }   else {
            this.setChangeSong(this.currentIndex + 1)
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        if(this.currentIndex === 0) {
            this.setChangeSong(this.songs[this.currentList].length - 1)
        } else {
            this.setChangeSong(this.currentIndex - 1)
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let randomNum
        do{
            randomNum = Math.floor(Math.random() * this.songs[this.currentList].length)
            if(randomArray.length === this.songs[this.currentList].length) {
                randomArray.splice(0,this.songs[this.currentList].length)
            }
        }while(randomArray.includes(randomNum))
        randomArray.push(randomNum)
        this.setChangeSong(randomNum)
        app.currentIndex = randomNum
        this.loadCurrentSong()
    },
    start: function() {
        this.loadConfig()

        this.definedProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        audio.volume = 0.5

        //Hiển thị trạng thái ban đầu của button random và repeat
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()


