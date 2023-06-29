var API_KEY = "30888e8f271f1698dcfb0228f589bec1";
var READ_ACCESS_TOKEN = "";

var API_HOST = "https://api.themoviedb.org/3";

var PATHS = {
    searchMovies: "/search/movie",
    searchTvs: "/search/tv",
    moveInfo: "/movie/",
    person: "/person/",
    multiple: "/search/multi",
    tv_info: "/tv/",
    castSearch: "/search/person",
    tv_season: function (tvId, seasonNumber) {
        return "/tv/" + tvId + "/season/" + seasonNumber;
    },
    tv_season_credits: function (tvId, season_number) {
        return "/tv/" + tvId + "/season/" + season_number + "/credits"
    },
    episode_details: function (tvId, seasonNumber, episodeNumber) {
        return "/tv/" + tvId + "/season/" + seasonNumber + "/episode/" + episodeNumber
    },
    getMovieImages: function (movieId) {
        return "/movie/" + movieId + "/images"
    }
};

const TMDB = {

    LANGUAGE: "en-US",
    TEST_ID: "299534",
    TEST_CAST_ID: "1245",
    TEST_TV_ID: "1399",

    image_paths: {
        original: "https://image.tmdb.org/t/p/original",
        w500: "https://image.tmdb.org/t/p/w500",
        w200: "https://image.tmdb.org/t/p/w200"
    },

    setLanguage: function (language) {
        TMDB.LANGUAGE = language;
    },

    init: function () {
        TMDB.fetch_api_key();
        TMDB.fetch_read_access_token();
    },

    fetch_read_access_token: function () {
        READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDg4OGU4ZjI3MWYxNjk4ZGNmYjAyMjhmNTg5YmVjMSIsInN1YiI6IjVkYzNjNGFlOTkyNTljMDAxMzdhZTY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nZn6l08oa9ZXTI4HdCWdyrK5W57yUZB6wqExBRWJnaU"
    },

    fetch_api_key: function () {
        API_KEY = "30888e8f271f1698dcfb0228f589bec1";
    },

    search_movie_by_name: function (name, year, cb, cberr) {

        var query = { query: name, language: TMDB.LANGUAGE };

        if (year) query.year = year;

        TMDB.request(PATHS.searchMovies, query, function (data) {
            data = TMDB.connect_with_images(data.results, ["poster_path", "backdrop_path"]);
            cb(data);
        }, cberr);
    },

    search_tv_by_name: function (name, year, cb, cberr) {

        var query = { query: name, language: TMDB.LANGUAGE };

        if (year) query.year = year;

        TMDB.request(PATHS.searchTvs, query, function (data) {
            data = TMDB.connect_with_images(data.results, ["poster_path", "backdrop_path"]);
            cb(data);
        }, cberr);
    },

    search_multi: function (name, cb, cberr) {
        TMDB.request(PATHS.multiple, { query: name, language: TMDB.LANGUAGE }, function (data) {
            data = TMDB.connect_with_images(data.results, ["poster_path", "backdrop_path"]);
            cb(data);
        }, cberr);
    },

    get_movie_info: function (id, cb, cberr) {
        TMDB.request(PATHS.moveInfo + id, { language: TMDB.LANGUAGE, append_to_response: "videos,images,credits,translations" }, function (data) {
            data = TMDB.connect_with_images([data], ["poster_path", "backdrop_path"]);
            cb(data);
        }, cberr);
    },

    get_person_info: function (id, cb, cberr) {
        //append_to_response: "images,movie_credits,tv_credits,combined_credits" 
        TMDB.request(PATHS.person + id, { language: TMDB.LANGUAGE }, function (data) {
            data = TMDB.connect_with_images([data], ["profile_path"]);
            cb(data[0]);
        }, cberr);
    },

    get_tv_info: function (id, cb, cberr) {
        TMDB.request(PATHS.tv_info + id, { language: TMDB.LANGUAGE, append_to_response: "videos,images,credits,translations" }, function (data) {
            data = TMDB.connect_with_images([data], ["poster_path", "backdrop_path"]);
            cb(data);
        }, cberr);
    },

    get_tv_season: function (id, seasonNumber, cb, cberr) {
        TMDB.request(PATHS.tv_season(id, seasonNumber), { language: TMDB.LANGUAGE, append_to_response: "videos,images,credits,translations" }, function (data) {
            data = TMDB.connect_with_images([data], ["still_path"]);
            cb(data[0]);
        }, cberr)
    },

    get_episode_info: function (tvId, seasonNumber, episodeNumber, cb, cberr) {
        TMDB.request(PATHS.episode_details(tvId, seasonNumber, episodeNumber), { language: TMDB.LANGUAGE, append_to_response: "translations" }, function (data) {
            data = TMDB.connect_with_images([data], ["still_path"]);
            cb(data[0]);
        }, cberr)
    },

    get_season_credits: function (tvId, seasonNumber, cb, cberr) {
        TMDB.request(PATHS.tv_season_credits(tvId, seasonNumber), { language: TMDB.LANGUAGE }, function (data) {
            cb(data);
        }, cberr);
    },

    get_images_movie: function (movieId, cb, cberr) {
        TMDB.request(PATHS.getMovieImages(movieId), {}, function (data) {
            data.backdrops = TMDB.connect_with_images(data.backdrops, ["file_path"]);
            data.posters = TMDB.connect_with_images(data.posters, ["file_path"]);
            cb(data);
        }, cberr);
    },

    search_cast: function (name, cb, cberr) {
        TMDB.request(PATHS.castSearch, { query: name, language: TMDB.LANGUAGE }, function (data) {
            data = TMDB.connect_with_images(data.results, ["profile_path"]);
            cb(data);
        }, cberr);
    },

    connect_with_images: function (items, keys) {

        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < keys.length; j++) {
                if (items[i][keys[j]]) {
                    var path = items[i][keys[j]];
                    items[i][keys[j]] = {
                        original: TMDB.image_paths.original + path,
                        w500: TMDB.image_paths.w500 + path,
                        w200: TMDB.image_paths.w200 + path
                    }
                }
            }
        }

        return items;

    },

    create_query: function (path, params) {

        var params_string = "";

        if (params) {
            for (var key in params) {
                if (params_string !== "") {
                    params_string += "&";
                }
                params_string += key + "=" + encodeURIComponent(params[key]);
            }

            params_string = "?api_key=" + API_KEY + "&" + params_string;
        }

        return API_HOST + path + params_string;

    },

    request: function (path, params, success, err) {

        var url = TMDB.create_query(path, params);

        var req = new XMLHttpRequest();

        req.timeout = 30000;

        req.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                success(JSON.parse(this.responseText));
            }

        }

        req.onerror = function (e) {
            if (err) err(words[words["incorrect playlist url"]]);
        }

        req.ontimeout = function () {
            if (err) err("timeout");
        }

        req.open("get", url);
        req.send();

    },

};

TMDB.init();

function tmdb_search (name, cb) {

    if (!name) return

    name = name.split("|").pop().trim();

    // name = name.split(":").pop().trim();

    name = name.toLowerCase();

    name = name
        .replace("[", "")
        .replace("]", "")
        .replace("(", "")
        .replace(")", "");

    var name_arr = name.split(" ");

    name = [];

    var year = null;

    for (var i = 0; i < name_arr.length; i++) {

        var str = name_arr[i];

        if (str.length == 4 && parseInt(str) > 1000) {
            year = parseInt(str);
        } else if (!year) {
            name.push(str);
        }

    }

    name = name.join(" ");



    TMDB.search_movie_by_name(name, year, function (data) {

        if (data.length) {

            TMDB.get_movie_info(data[0].id, function (movie) {

                if (cb) {
                    cb(movie[0])
                } else {
                    set_tmdb_info(movie[0]);
                }

            });

        }

    });


}

function set_tmdb_info (movie) {

    var parent = document.querySelector(".actors_scroll");

    parent.innerHTML = "";

    if (movie.credits && movie.credits.cast && movie.credits.cast.length) {
        render_actors(movie.credits.cast);
    }

    selected_movie.tmdb_id = movie.id;

    if (movie.poster_path && movie.poster_path.original) {

        var image = new Image();

        image.onload = function () {
            movie_info_img.setAttribute("style", "background-image:url(" + this.src + "),url(" + HOST + "img/icons/not_found1.png)");
        }

        image.src = movie.poster_path.original

    }

    movie_info_name.innerHTML = movie.title || movie.name;

    if (movie.release_date && movie.release_date.toLowerCase() != "n/a") {
        movie_info_name.innerHTML += " " + movie.release_date.split("-")[0];
    }

    if (movie.first_air_date && movie.first_air_date.toLowerCase() != "n/a") {
        movie_info_name.innerHTML += " " + movie.first_air_date.split("-")[0];
    }

    if (movie.adult) movie_info_name.innerHTML += " 18+"

    if (movie.overview && movie.overview.toLowerCase() != "n/a") {
        movie_info_desc.innerHTML = movie.overview;
        movie_info_desc.style.display = "block";
    }

    if (movie.genres && movie.genres.length) {

        for (var g = 0; g < movie.genres.length; g++) {

            movie.genres[g] = movie.genres[g].name;

        }

        movie_info_genre.innerHTML = words["genres"] + ": " + movie.genres.join(" ");
        movie_info_genre.style.display = "block";

    }

    // if (movie.vote_average) {
    //     movie_info_tmdb.style.display = "block";
    //     movie_info_tmdb.innerHTML = movie.vote_average;
    // }

    if (movie.credits && movie.credits.cast && movie.credits.cast.length) {

        var cast = movie.credits.cast;

        for (var c = 0; c < cast.length; c++) {
            cast[c] = cast[c].name;
        }

        // movie_info_cast.innerHTML = words["cast"] + ": " + cast.join(" ");

    }

    if (isSeries) {

        render_episodes();

        if (movie.episode_run_time && movie.episode_run_time.length) {

            var time = movie.episode_run_time[0] * 60;

            movie_info_duration.innerHTML = formatTime(time);
            movie_info_duration.style.display = "block";

        }

    } else {

        if (movie.runtime && movie.runtime != 0) {

            var time = parseInt(movie.runtime) * 60;

            movie_info_duration.innerHTML = formatTime(time);
            movie_info_duration.style.display = "block";

        }

    }

}

function get_tmdb_episode_info (id, season, episode) {

    TMDB.get_episode_info(id, season, episode, function (data) {

        var image = document.getElementById("episode_image_S" + season + "E" + episode);

        if (image && data.still_path && data.still_path.w200) {

            var img = new Image();

            img.onload = function () {
                image.setAttribute("style", "background-image:url(" + this.src + "),url(" + HOST + "img/icons/not_found1.png)");
            }

            img.src = data.still_path.w200;

        }

    });

}