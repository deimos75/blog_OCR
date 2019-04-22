import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PostService implements OnInit {

    // Tableau des postes
    posts = [
        {title: 'Titre 1', content: 'contenu 1', date: 'date 1', loveIts: '1'},
        {title: 'Titre 2', content: 'contenu 2', date: 'date 2', loveIts: '0'},
        {title: 'Titre 3', content: 'contenu 3', date: 'date 3', loveIts: '-1'},
    ];

    constructor() {}

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        return this.posts;
    }

}
