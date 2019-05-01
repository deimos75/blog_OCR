import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PostService implements OnInit {

    // Tableau des postes
    private posts = [
        {title: 'Titre 1', content: 'contenu 1', date: Date(), loveIts: 1},
        {title: 'Titre 2', content: 'contenu 2', date: Date(), loveIts: 0},
        {title: 'Titre 3', content: 'contenu 3', date: Date(), loveIts: -1},
    ];

    // Subject qui émettra le tableau des posts (grâce à emitPosts())
    postSubject = new Subject<any[]>();

    constructor() {}

    ngOnInit() {
        this.getPosts();
    }

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
    addPost(title: string, content: string, loveIts: number) {
        console.log('===> addPost');
        const newPost = {
            title: '',
            content: '',
            date: Date(),
            loveIts: 0
        };
        newPost.title = title;
        newPost.content = content;
        newPost.loveIts = loveIts;
        this.posts.push(newPost);
    }

}
