import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteValues } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { SqliteService } from './sqlite.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<string | null>;

  constructor(private sqliteService: SqliteService) {
    this.currentUser = new BehaviorSubject<string | null>(null);
    this.loadUser();
  }

  public async loadUser() {
    const { value } = await Preferences.get({ key: 'currentUser' });
    if (value) {
      this.currentUser.next(value);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

  public getCurrentUser(): string | null {
    return this.currentUser.value;
  }

  public getCurrentUserId(): string | null {
    return this.currentUser.value;
  }




  async register(username: string, password: string): Promise<void> {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const dbName = await this.sqliteService.getDbName();

    await CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        { statement: sql, values: [username, password] }
      ]
    });
  }

  async login(username: string, password: string): Promise<void> {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const dbName = await this.sqliteService.getDbName();

    const result: capSQLiteValues = await CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [username, password]
    });

    if (result.values.length > 0) {
      this.currentUser.next(username);
      await Preferences.set({ key: 'currentUser', value: username });
    } else {
      throw new Error('Invalid username or password');
    }
  }

  

  async logout(): Promise<void> {
    this.currentUser.next(null);
    await Preferences.remove({ key: 'currentUser' });
  }

  async updateProfile(username: string, profileData: { firstName: string; lastName: string; birthDate: string; profilePicture: string }): Promise<void> {
    const sql = 'UPDATE users SET firstName = ?, lastName = ?, birthDate = ?, profilePicture = ? WHERE username = ?';
    const dbName = await this.sqliteService.getDbName();

    await CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        { statement: sql, values: [profileData.firstName, profileData.lastName, profileData.birthDate, profileData.profilePicture, username] }
      ]
    });
  }

  async getProfile(username: string): Promise<{ firstName: string; lastName: string; birthDate: string; profilePicture: string } | null> {
    const sql = 'SELECT firstName, lastName, birthDate, profilePicture FROM users WHERE username = ?';
    const dbName = await this.sqliteService.getDbName();

    const result: capSQLiteValues = await CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [username]
    });

    if (result.values.length > 0) {
      return result.values[0] as { firstName: string; lastName: string; birthDate: string; profilePicture: string };
    } else {
      return null;
    }
  }
}
