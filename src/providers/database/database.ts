import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { environment } from '../../environments/environment';

@Injectable()
export class DatabaseProvider {

  constructor(private db: SQLite) {
  }

  openCreate(query: string) {
    this.db.create({
    name: environment.projName + "Db.db",
    location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(query, {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  openSelect(query: string) {
    this.db.create({
    name: environment.projName + "Db.db",
    location: "default"
    })
    .then((db: SQLiteObject) => {
      db.executeSql(query, {})
        .then(response => {
          let entries = [];
          for (let index = 0; index < response.rows.length; index++) {
            entries.push(response.rows.item(index));
          }
          return Promise.resolve(entries);
        })
        .catch(e => console.log(e));
      })
    .catch(e => console.log(e));
  }

  createPostsTable() {
    let sql = "CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, image TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP)";
    return this.openCreate(sql);
  }

  createPost(postData: any) {
    let sql = 'INSERT INTO posts(title, content) VALUES(?,?)';
    return this.openCreate(sql);
  }

  getAllPosts() {
    let sql = 'SELECT * FROM posts';
    return this.openSelect(sql);
  }

  getOnePost(id: number) {
    let sql = 'SELECT * FROM posts WHERE id = ?'
    return this.openSelect(sql);
  }

}
