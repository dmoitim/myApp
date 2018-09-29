import { Injectable } from '@angular/core';

const config_name = 'config';

@Injectable()
export class ConfigProvider {
  private config = {
    showSlide: false,
    name: '',
    username: ''
  };

  constructor() {
    
  }

  getConfigData(): any {
    return localStorage.getItem(config_name);
  }

  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: '',
      username: ''
    };

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (username) {
      config.username = username;
    }

    localStorage.setItem(config_name, JSON.stringify(config));
  }
}
