import { Component, OnInit, Input } from '@angular/core';

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


export class Post {
  title: string;
  content: string;
  loveIts: number;
  date: Date;

  constructor(title: string, content: string, loveIts: number) {
    this.title = title;
    this.content = content;
    this.loveIts = loveIts;
    this.date = new Date();
  }

}
