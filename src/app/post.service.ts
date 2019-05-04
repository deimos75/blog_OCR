import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable() // Permet d'injecter HttpClientModule
export class PostService {

    // Tableau des postes
    posts = [];

    // Subject qui émettra le tableau des posts (grâce à emitPosts())
    postSubject = new Subject<any[]>();

    constructor(private httpClient: HttpClient) {
        this.getPosts();
    }


    // ***************************************************** /
    // Emet le subject (cette méthode est appelée par toute les autres méthodes)
    emitPostSubject() {
        // Le Subject émet une copie (slice) de tableau local
        this.postSubject.next(this.posts.slice());
    }

    // Ajout d'un post
    addPost(newPost: Post) {
        this.posts.push(newPost);
        this.savePosts();
        this.emitPostSubject();
    }

    // Suppression d'un post en local
    deletePost(id: number) {
        this.posts.splice(id, 1);
        this.savePosts();
        this.emitPostSubject();
    }

    // Sauvegarde des posts
    savePosts() {
        console.log('');
        console.log('===> SERVICE: savePost()');
        this.httpClient.put('https://blog-31933.firebaseio.com/posts.json', this.posts).subscribe(
            () => {
                console.log('===> this.posts : ' + this.posts);
                console.log('Enregistrement terminé !');
            },
            (error) => {
                console.log('Erreur de sauvegarde : ' + error);
            }
        );
        console.log('===> this.posts : ' + this.posts);
        console.log('===> FIN savePosts()');
    }

    // Récupère les posts depuis la BDD
    getPosts() {
        console.log('');
        console.log('SERVICE: getPosts()');
        this.httpClient.get<any[]>('https://blog-31933.firebaseio.com/posts.json').subscribe(
            (reponse) => {
                this.posts = reponse;
                this.emitPostSubject();     // Affiche sur la page les données récupérées de la BDD
                console.log('===> this.posts : ' + this.posts);
                console.log('===> get SUCCESS');
            },
            (error) => {
                console.log('Erreur dans la récupération des posts: ' + error);
            }
        );
        console.log('===> this.posts = ' + this.posts);
        console.log('===> FIN getPost()');
    }

}
