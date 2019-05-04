import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './models/post.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { DatePipe } from '@angular/common';

@Injectable() // Permet d'injecter HttpClientModule
export class PostService {

    // Tableau des postes
    posts = [];

    // Subject qui émettra le tableau des posts (grâce à emitPosts())
    postSubject = new Subject<any[]>();

    constructor(public datepipe: DatePipe) {
        this.getPosts();
    }


    // ***************************************************** /
    // Emet le subject (cette méthode est appelée par toute les autres méthodes)
    emitPostSubject() {
        // Le Subject émet une copie (slice) de tableau local
        this.postSubject.next(this.posts.slice());
    }

    // Ajout d'un post
    addPost(newPost: Post, enregistrer: Boolean) {
        this.posts.push(newPost);
        this.savePosts(enregistrer);
        this.emitPostSubject();
    }

    // Suppression d'un post en local
    deletePost(id: number) {
        const enregistrer = false;
        this.posts.splice(id, 1);
        this.savePosts(enregistrer);
        this.emitPostSubject();
    }

    // Sauvegarde des posts
    savePosts(enregistrer: Boolean) {
        // Sauvegarde de la date du jour s'il y a un tableau et un nouveau poste
        const taille = this.posts.length;
        if (taille !== 0 && enregistrer) {
            this.posts[taille - 1].date = new Date();
            // Conversion en string pour l'enregistrement en BDD
            const latest_date = this.datepipe.transform(this.posts[taille - 1].date, 'Créée le dd/MM/yyyy à HH:mm:ss');
            this.posts[taille - 1].date = latest_date;
        }

        firebase.database().ref('/posts').set(this.posts);
        this.emitPostSubject();
    }

    // Récupère les posts depuis la BDD
    getPosts() {
        firebase.database().ref('/posts').on('value', (data: DataSnapshot) => {
            this.posts = data.val() ? data.val() : [];
            this.emitPostSubject();
        });
    }

    saveLoveIts(id: number, loveIts: number) {
        this.posts[id].loveIts = loveIts;
        const enregistrer = false;
        this.savePosts(enregistrer);
    }

}
