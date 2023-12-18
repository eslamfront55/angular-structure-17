import { Meta, Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  constructor(private titleService: Title,
    private metaService: Meta,
    private http: HttpClient) { }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }

  private createTagObject(tag: { name?: string, property?: string, content: string, scheme?: string }): any {
    const newTag: any = tag.name ? { name: tag.name, content: tag.content } : { property: tag.property, content: tag.content };
    if (tag.scheme) {
      newTag['scheme'] = tag.scheme;
    }
    return newTag;
  }

  addMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  addMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  updateMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  updateMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  removeMetaTagByName(name: string): void {
    this.metaService.removeTag(`name='${name}'`);
  }

  removeMetaTagByProperty(property: string): void {
    this.metaService.removeTag(`property='${property}'`);
  }

  getMetaTagsName(): any {
    return this.metaService.getTags('name');
  }
  getMetaTagsProperty(): any {
    return this.metaService.getTags('property');
  }

  setDefaultMetaTags(): any {
    this.updateTitle('هودج');
    this.addMetaTagsName([
      { name: 'title', content: 'هودج' },
      { name: 'description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://metatags.io/' },

      { name: 'twitter:title', content: 'هودج' },
      { name: 'twitter:description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { name: 'twitter:image', content: 'https://metatags.io/images/meta-tags.png' },
    ]);
    this.addMetaTagsProperty([


      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://metatags.io/' },
      { property: 'og:title', content: 'هودج' },
      { property: 'og:description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { property: 'og:image', content: 'https://metatags.io/images/meta-tags.png' },
      { property: 'twitter:site_name', content: 'موقع هودج' }
    ]);
  }
  updateDefaultMetaTags(): any {
    this.updateTitle('هودج');
    this.updateMetaTagsName([
      { name: 'description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { name: 'title', content: 'هودج' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://metatags.io/' },

      { name: 'twitter:title', content: 'هودج' },
      { name: 'twitter:description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { name: 'twitter:image', content: 'https://metatags.io/images/meta-tags.png' },
    ]);
    this.updateMetaTagsProperty([


      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://metatags.io/' },
      { property: 'og:title', content: 'هودج' },
      { property: 'og:description', content: "هل تعرف ما يمكنك توقعه في مناطق السعودية الـ13؟ تعرف على سر تميز كل منطقة، والمعالم التي لا بد من زيارتها في كل منها من خلال موقع هودج" },
      { property: 'og:image', content: 'https://metatags.io/images/meta-tags.png' },
      { property: 'twitter:site_name', content: 'موقع هودج' }
    ]);
  }

  getPLaceById(id: any): Observable<any> {
    return this.http.get(`http://api.talbinah.net/site/blogs?page=1&per_page=12`);
  }
}
