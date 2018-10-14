import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Platform } from "ionic-angular";
import { BehaviorSubject } from "rxjs/Rx";
import { Storage } from "@ionic/storage";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private http: Http, private sqlite: SQLite, private sqlitePorter: SQLitePorter, private platform: Platform, private storage: Storage) {
    console.log('CONSTRUCTOR CALLED');
    this.database = null;
    this.databaseReady = new BehaviorSubject(false);
  }

  load() {
    if(this.database !== null) {
      return;
    }
    this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'monster.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if(val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        })
        .catch((error) => {
          console.log('SQLite CREATE', error);
        });
      })
      .catch((err) => {
        console.log('PLATFORM READY', err);
      });
  };

  fillDatabase() {
    this.http.get('assets/monsters.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(() => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(error => console.log('ERROR: Import Sql To DB', error));
      });
  };

  getAllMonster() {
    return this.database.executeSql('SELECT * FROM monster', []).then((data) => {
      let monsters = [];
      if(data.rows.length > 0) {
        for(let i = 0; i < data.rows.length; i++) {
          const monster = data.rows.item(i);
          monsters.push(monster);
        }
      }
      console.log('RETURN MONSTERS');
      return monsters;
    }, err => {
      console.log('GET ALL MONSTER', JSON.stringify(err));
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
