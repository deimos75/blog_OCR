import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  // Paramètres
  @Input() titleParam: string;
  @Input() contentParam: string;
  @Input() loveItsParam: number;

  // Attibuts
  post: Post;
  signeLoveIts: string;

  constructor() { }



  ngOnInit() {
    this.post = new Post(this.titleParam, this.contentParam, this.loveItsParam);
    this.initColor();
  }

  // Méthodes
  initColor() {
    if (this.loveItsParam > 0) {
      this.signeLoveIts = 'positif';
    } else if (this.loveItsParam < 0) {
      this.signeLoveIts = 'négatif';
    } else {
      this.signeLoveIts = 'zéro';
    }
  }

  onLoveItsPlus() {
    this.loveItsParam++;
    this.initColor();
    console.log('loveIts = ' + this.loveItsParam);
  }

  onLoveItsMinus() {
    this.loveItsParam--;
    this.initColor();
    console.log('loveIts = ' + this.loveItsParam);
  }

}


// export class Post {
//   date: Date;

//   constructor(public title: string, public content: string, public loveIts: number) {
//     this.title = title;
//     this.content = content;
//     this.loveIts = loveIts;
//     this.date = new Date();
//   }

// }
