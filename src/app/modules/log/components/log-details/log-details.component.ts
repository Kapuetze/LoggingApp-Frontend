import { Component, OnInit, Input } from '@angular/core';
import { Log } from '@models/log';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.css']
})
export class LogDetailsComponent implements OnInit {

    @Input() log: Log;

    constructor() { }

    ngOnInit() {
    }

    getContent(content){
        var result = this.parseObject(content, "<ul class='uk-list uk-list-small uk-margin-remove'>");
        result += "</ul>";
        return result;
    }

    parseObject(content, result){
        var that = this;
        if (content){
            Object.keys(content).forEach(function (key, index) {
                if (typeof content[key] == 'object') {
                    //console.log(key);
                    result += `<li class='uk-text-bold'>${key}</li>`;
                    result += `<ul class="uk-list uk-list-small uk-margin-remove">`;
                    result = that.parseObject(content[key], result);
                    result += "</ul>";
                }
                else {
                    result += `<li><span class='uk-text-bold'>${key}</span>: ${content[key]}</li>`;
                    //console.log(key + "   :   " + content[key]);
                }
            });
        }

        return result;
    }

}
