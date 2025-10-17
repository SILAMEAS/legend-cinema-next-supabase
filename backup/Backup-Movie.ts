import {IMovieResponse} from "@/redux/services/movie/type";

export const BackupMovie: Array<IMovieResponse> = [
    {
        id: 1,
        title: "Venom: The Last Dance",
        image: "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
        rating: "7.2",
        duration: "109 min",
        genre: "Action, Sci-Fi",
    },
    {
        id: 2,
        title: "Terrifier 3",
        image: "https://image.tmdb.org/t/p/w500/7NDHoebflLwL1CcgLJ9wZbbDrmV.jpg",
        rating: "6.8",
        duration: "125 min",
        genre: "Horror, Thriller",
    },
    {
        id: 3,
        title: "Smile 2",
        image: "https://image.tmdb.org/t/p/w500/aE85MnPIsSoSs3978Noo16BRsKN.jpg",
        rating: "7.1",
        duration: "132 min",
        genre: "Horror, Mystery",
    },
    {
        id: 4,
        title: "The Wild Robot",
        image: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        rating: "8.5",
        duration: "102 min",
        genre: "Animation, Family",
    },
    {
        id: 5,
        title: "Joker: Folie à Deux",
        image: "https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg",
        rating: "5.7",
        duration: "138 min",
        genre: "Drama, Thriller",
    },
    {
        id: 6,
        title: "Transformers One",
        image: "https://image.tmdb.org/t/p/w500/qbkAqmmEIZfrCO8ZQAuIuVMlWoV.jpg",
        rating: "8.1",
        duration: "104 min",
        genre: "Animation, Action",
    },
    {
        id: 7,
        title: "Beetlejuice Beetlejuice",
        image: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
        rating: "7.2",
        duration: "105 min",
        genre: "Comedy, Fantasy",
    },
    {
        id: 8,
        title: "The Substance",
        image: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
        rating: "7.3",
        duration: "140 min",
        genre: "Horror, Sci-Fi",
    },
];

/**
 * use this :   <button onClick={async ()=> await _insertMovies(BackupMovie)}>insert data</button>
 * */