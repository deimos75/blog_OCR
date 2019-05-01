export class Book {
    date: Date;

    constructor(public title: string, public content: string, public loveIts: number) {
        this.title = title;
        this.content = content;
        this.loveIts = loveIts;
        this.date = new Date();
    }

}
