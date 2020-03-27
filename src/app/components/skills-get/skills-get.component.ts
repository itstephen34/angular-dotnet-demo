import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SkillService } from 'src/app/services/skill.service';

interface Skill {
  id?: number,
  SkillName: string;
}

@Component({
  selector: 'app-skills-get',
  templateUrl: './skills-get.component.html',
  styleUrls: ['./skills-get.component.css'],
  providers: [DecimalPipe]
})
export class SkillsGetComponent implements OnInit {
  skills: Array<{id?: number, SkillName: string}>
  page = 1;
  pageSize = 4;
  collectionSize = null
  currentPage = 1;
  searchForm = new FormGroup({ filter: new FormControl('') });
  Original: Array<{id?: number, SkillName: string}>

  constructor(private skillService: SkillService, pipe: DecimalPipe) { 

    this.searchForm.valueChanges.subscribe( d => {
      this.skills = this.Original;
      if (d != '') {
        this.skills = this.search(d.filter);
      } else {
        this.skills = this.Original;
      }
      
    })
  }

  ngOnInit() {
    this.getSkills(this.page)
  }

  getSkills(pageNo: number): void {
    const pg = (pageNo - 1)
    const req = {
      page: pg,
      top: this.pageSize
    }
    this.skillService.getSkillList(req)
      .subscribe((skills) => {
        if(this.collectionSize == null) {
          const noPages = skills.pages;
          this.collectionSize = Array.from(Array(noPages)).map((x, i) => i );
        }
        this.skills = skills.items;
        this.Original = skills.items;
      })
  }

  search(text: string) {
    if(this.skills) {
    return this.skills.filter(skill => {
      const term = text.toLowerCase();
      return skill.SkillName.toLowerCase().includes(term)
    });
  }
  }

  get listSkills() {
    if(this.skills) {
    return this.skills.map((skill, i) => ({id: i + 1, ...skill}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


}
