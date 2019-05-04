import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  // Attributs
  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation du formulaire
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      loveIts: [0],
      date: new Date()
    });
  }

  // Enregitrer un nouveau post
  onSavePost() {
    // Récupère les données du DOM
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(title, content, 0);

    // Ajout d'un nouveau poste au tableau des postes et sauvegarde en BDD
    this.postService.addPost(newPost);

    // Rédirection vers les posts
    this.router.navigate(['/posts']);
  }

}
