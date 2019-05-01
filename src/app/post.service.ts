import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './models/post.model';

@Injectable()
export class PostService {

    // Tableau des postes
    posts = [
        {title: 'Titre 1', content: 'contenu 1', date: new Date(), loveIts: 1},
        {title: 'Titre 2', content: 'contenu 2', date: new Date(), loveIts: 0},
        {title: 'Titre 3', content: 'contenu 3', date: new Date(), loveIts: -1},
    ];

    // Subject qui émettra le tableau des posts (grâce à emitPosts())
    postSubject = new Subject<any[]>();

    constructor() {}


    // ***************************************************** /
    // Emet le subject
    emitPostSubject() {
        // Le Subject émet une copie (slice) de tableau local
        this.postSubject.next(this.posts.slice());
    }

    // Récupère tous les postes grâce au Subject
    getPosts() {
        return this.emitPostSubject();
    }

    // Ajout d'un post
    addPost(newPost: Post) {
        console.log('===> Post Service -> addPost()');
        this.posts.push(newPost);
        this.emitPostSubject();
    }

}
