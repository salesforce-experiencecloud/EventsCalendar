import { LightningElement, api, track, wire } from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullcalendar500';
import jquery341 from '@salesforce/resourceUrl/jquery341';
import LANG from '@salesforce/i18n/lang';
import LOCALE from '@salesforce/i18n/locale';

const eventsJSON = '[{"attributes":{"type":"Event","url":"/services/data/v48.0/sobjects/Event/00U1U000008tip8UAA"},"Id":"00U1U000008tip8UAA","Subject":"Community Cloud Ask the Expert Webinar","IsAllDayEvent":false,"ActivityDateTime":"2020-06-24T17:00:00.000+0000","ActivityDate":"2020-06-24","DurationInMinutes":60,"StartDateTime":"2020-06-24T17:00:00.000+0000","EndDateTime":"2020-06-24T18:00:00.000+0000","Description":"Join us as we answer adoption, best-practice and how-to questions live! This is your chance to talk with Salesforce experts and to learn from your peers.","OwnerId":"0051U0000021sbeQAA","Type":"Virtual","IsPrivate":false,"ShowAs":"Busy","IsDeleted":false,"IsChild":false,"IsGroupEvent":false,"GroupEventType":"0","CreatedDate":"2019-09-03T23:04:06.000+0000","CreatedById":"0051U000005LF8QQAW","LastModifiedDate":"2020-04-09T18:32:55.000+0000","LastModifiedById":"0051U000005LF8QQAW","SystemModstamp":"2020-04-09T18:32:55.000+0000","IsArchived":false,"IsVisibleInSelfService":true,"IsRecurrence":false,"IsReminderSet":false,"EventSubtype":"Event","IsRecurrence2Exclusion":false,"Recurrence2PatternText":"RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;WKST=SU","Recurrence2PatternVersion":"1","IsRecurrence2":true,"IsRecurrence2Exception":false,"Recurrence2PatternStartDate":"2019-09-04T17:00:00.000+0000","Recurrence2PatternTimeZone":"America/New_York","Image_URL__c":"/file-asset/astro","Calendar_Background_Color__c":"rgb(255, 117, 36)","Calendar_Border_Color__c":"rgb(255, 117, 36)","Calendar_Rendering__c":"Normal","Calendar_Text_Color__c":"White","Display_Events_Local_Timezone__c":false,"Event_URL_Text__c":"Register","Event_URL__c":"https://register.gotowebinar.com/rt/2968421206168261891"},{"attributes":{"type":"Event","url":"/services/data/v48.0/sobjects/Event/00U1U00000D9h5ZUAR"},"Id":"00U1U00000D9h5ZUAR","Subject":"Community Cloud: Show Me How","IsAllDayEvent":false,"ActivityDateTime":"2020-06-25T16:00:00.000+0000","ActivityDate":"2020-06-25","DurationInMinutes":60,"StartDateTime":"2020-06-25T16:00:00.000+0000","EndDateTime":"2020-06-25T17:00:00.000+0000","Description":"Join this call to learn about some of Community Cloud\'s out-of-the-box features and talk about relevant best practices and tips & tricks. Our goal is to spend approximately 10-15 mins to get hands-on, demo, and discuss each topic.\r\n\r\nThis week\'s topic list:\r\n[TBD]","OwnerId":"0051U0000021sbeQAA","Type":"Virtual","IsPrivate":false,"ShowAs":"Busy","IsDeleted":false,"IsChild":false,"IsGroupEvent":false,"CreatedDate":"2020-05-04T16:56:08.000+0000","CreatedById":"0051U000005LF8QQAW","LastModifiedDate":"2020-05-04T16:56:08.000+0000","LastModifiedById":"0051U000005LF8QQAW","SystemModstamp":"2020-05-04T16:56:08.000+0000","IsArchived":false,"IsVisibleInSelfService":false,"IsRecurrence":false,"IsReminderSet":false,"EventSubtype":"Event","IsRecurrence2Exclusion":false,"Recurrence2PatternText":"RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH;WKST=SU","Recurrence2PatternVersion":"1","IsRecurrence2":true,"IsRecurrence2Exception":false,"Recurrence2PatternStartDate":"2020-05-14T16:00:00.000+0000","Recurrence2PatternTimeZone":"America/New_York","Image_URL__c":"/file-asset/astro","Calendar_Background_Color__c":"rgb(148, 0, 158)","Calendar_Border_Color__c":"rgb(148, 0, 158)","Calendar_Rendering__c":"Normal","Calendar_Text_Color__c":"White","Display_Events_Local_Timezone__c":false,"Event_URL_Text__c":"Register","Event_URL__c":"https://attendee.gotowebinar.com/rt/86995964372276226"},{"attributes":{"type":"Event","url":"/services/data/v48.0/sobjects/Event/00U1U000008tiplUAA"},"Id":"00U1U000008tiplUAA","Subject":"Community Cloud Ask the Expert Webinar","IsAllDayEvent":false,"ActivityDateTime":"2020-07-01T16:00:00.000+0000","ActivityDate":"2020-07-01","DurationInMinutes":60,"StartDateTime":"2020-07-01T16:00:00.000+0000","EndDateTime":"2020-07-01T17:00:00.000+0000","Description":"Join us as we answer adoption, best-practice and how-to questions live! This is your chance to talk with Salesforce experts and to learn from your peers.","OwnerId":"0051U0000021sbeQAA","Type":"Virtual","IsPrivate":false,"ShowAs":"Busy","IsDeleted":false,"IsChild":false,"IsGroupEvent":false,"GroupEventType":"0","CreatedDate":"2019-09-03T23:05:04.000+0000","CreatedById":"0051U000005LF8QQAW","LastModifiedDate":"2020-04-09T18:33:23.000+0000","LastModifiedById":"0051U000005LF8QQAW","SystemModstamp":"2020-04-09T18:33:23.000+0000","IsArchived":false,"IsVisibleInSelfService":true,"IsRecurrence":false,"IsReminderSet":false,"EventSubtype":"Event","IsRecurrence2Exclusion":false,"Recurrence2PatternText":"RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;WKST=SU","Recurrence2PatternVersion":"1","IsRecurrence2":true,"IsRecurrence2Exception":false,"Recurrence2PatternStartDate":"2019-09-11T16:00:00.000+0000","Recurrence2PatternTimeZone":"America/New_York","Image_URL__c":"/file-asset/astro","Calendar_Background_Color__c":"rgb(255, 117, 36)","Calendar_Border_Color__c":"rgb(255, 117, 36)","Calendar_Rendering__c":"Normal","Calendar_Text_Color__c":"White","Display_Events_Local_Timezone__c":false,"Event_URL_Text__c":"Register","Event_URL__c":"https://register.gotowebinar.com/rt/2968421206168261891"},{"attributes":{"type":"Event","url":"/services/data/v48.0/sobjects/Event/00U1U000008tip9UAA"},"Id":"00U1U000008tip9UAA","Subject":"Community Cloud Ask the Expert Webinar","IsAllDayEvent":false,"ActivityDateTime":"2020-07-08T17:00:00.000+0000","ActivityDate":"2020-07-08","DurationInMinutes":60,"StartDateTime":"2020-07-08T17:00:00.000+0000","EndDateTime":"2020-07-08T18:00:00.000+0000","Description":"Join us as we answer adoption, best-practice and how-to questions live! This is your chance to talk with Salesforce experts and to learn from your peers.","OwnerId":"0051U0000021sbeQAA","Type":"Virtual","IsPrivate":false,"ShowAs":"Busy","IsDeleted":false,"IsChild":false,"IsGroupEvent":false,"GroupEventType":"0","CreatedDate":"2019-09-03T23:04:06.000+0000","CreatedById":"0051U000005LF8QQAW","LastModifiedDate":"2020-04-09T18:32:55.000+0000","LastModifiedById":"0051U000005LF8QQAW","SystemModstamp":"2020-04-09T18:32:55.000+0000","IsArchived":false,"IsVisibleInSelfService":true,"IsRecurrence":false,"IsReminderSet":false,"EventSubtype":"Event","IsRecurrence2Exclusion":false,"Recurrence2PatternText":"RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;WKST=SU","Recurrence2PatternVersion":"1","IsRecurrence2":true,"IsRecurrence2Exception":false,"Recurrence2PatternStartDate":"2019-09-04T17:00:00.000+0000","Recurrence2PatternTimeZone":"America/New_York","Image_URL__c":"/file-asset/astro","Calendar_Background_Color__c":"rgb(255, 117, 36)","Calendar_Border_Color__c":"rgb(255, 117, 36)","Calendar_Rendering__c":"Normal","Calendar_Text_Color__c":"White","Display_Events_Local_Timezone__c":false,"Event_URL_Text__c":"Register","Event_URL__c":"https://register.gotowebinar.com/rt/2968421206168261891"}]';


export default class Cccalendar extends LightningElement {

    @api timezone = 'local';
    @api eventColor = 'Blue';

    @track isInit = false;
    @track JSONEventInput;
    @track calendar;
    @track items;

    timezoneLabels = {
        'America/Los_Angeles': 'US Pacific Time', 
        'America/Chicago': 'US Central Time',
        'America/Denver': 'US Mountain Time', 
        'America/New_York': 'US Eastern Time',
        'GMT': 'GMT',
        'Asia/Jakarta': 'Western Indonesian Time',
        'Asia/Makassar': 'Central Indonesian Time',
        'Asia/Jayapura': 'Eastern Indonesian Time',
        'Asia/Kolkata':'India Standard Time',
        'Asia/Tokyo': 'Japan Time',
        'Australia/Sydney': 'Australian Eastern Standard Time',
        'Australia/Darwin': 'Australian Central Standard Time',
        'Australia/Perth': 'Australian Western Standard Time',
        'Europe/London': 'British Time',
        'Europe/Paris': 'Central European Time' 
        };
    
    connectedCallback()
    {
        Promise.all([
            loadStyle(this, fullCalendar + '/fullcalendar-5.0.0/packages/core/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-5.0.0/packages/bootstrap/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-5.0.0/packages/daygrid/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-5.0.0/packages/timegrid/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-5.0.0/packages/list/main.min.css'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/core/main.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/bootstrap/main.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/daygrid/main.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/timegrid/main.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/list/main.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-5.0.0/packages/interaction/main.min.js'),
            loadScript(this, jquery341 + '/jquery.min.js'),
          ]).then(() => {
                this.items = JSON.parse(this.eventsJSON);
                //this.populateCalendarEventsJSONObject(this.items);
                this.renderCalendar();
          }).catch((error) => {
              console.log(error);
          });
    }

    checkMobile()
    {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    checkTablet()
    {
        let userAgent = navigator.userAgent.toLowerCase();
        let isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
        return isTablet;
    }

    getURLParameter(name) 
    {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    pad(number) {
        return (number < 10 ? '0' : '') + number;
    }

    getISOFormattedDateString(inputDate) {
        var month = this.pad(inputDate.getMonth() + 1);
        return inputDate.getFullYear() + '-' + month + '-' + this.pad(inputDate.getDate()) + 'T' + this.pad(inputDate.getHours()) + ':' + this.pad(inputDate.getMinutes()) + ':' + this.pad(inputDate.getSeconds()) + 'Z';
    }

    convertTextToDate(dateText) {
        var dateTextFormatted = dateText.substring(0, dateText.length-9);
        var dateTimeArray = dateTextFormatted.split("T");
        var dateArray = dateTimeArray[0].split("-");
        var timeArray = dateTimeArray[1].split(":");
        return new Date(Date.UTC(dateArray[0],dateArray[1]-1,dateArray[2],timeArray[0],timeArray[1],timeArray[2]));
    }

    buildDateTimeTextInTimezone(inputEvent, timezone, locale, selectedTimezone, timezoneLabel) {
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        var eventInputVar = {};

        if(inputEvent.StartDateTime !== undefined && inputEvent.StartDateTime !== null && 
            inputEvent.EndDateTime !== undefined && inputEvent.EndDateTime !== null)
        {
            var startDateInitial = this.convertTextToDate(inputEvent.StartDateTime);
            var endDateInitial = this.convertTextToDate(inputEvent.EndDateTime);

            var startDateString = startDateInitial.toLocaleString(LOCALE, {timeZone: timezone});
            var endDateString = endDateInitial.toLocaleString(LOCALE, {timeZone: timezone});
            
            if(inputEvent.IsAllDayEvent === true)
            {
                startDateString = new Date(inputEvent.StartDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: timezone});
                endDateString = new Date(inputEvent.EndDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: timezone});
            }

            var startDate = new Date(startDateString);
            var endDate = new Date(endDateString);

            if(selectedTimezone === 'local')
            {
                eventInputVar.start = startDate.toISOString();
                eventInputVar.end = endDate.toISOString();
            }
            else 
            {
                eventInputVar.start = this.getISOFormattedDateString(startDate);
                eventInputVar.end = this.getISOFormattedDateString(endDate);
            }    

            var startDateText = months[startDate.getMonth()] + ' ' + startDate.getDate();
            var endDateText = months[endDate.getMonth()] + ' ' + endDate.getDate(); 
            var offset = 5 - (startDate.getTimezoneOffset()/60);

            var startDateHour = startDate.getHours();
            var startDateHourAMPM = (startDateHour >= 12) ? 'PM' : 'AM';
            startDateHour = (startDateHour === 0) ? 12 : startDateHour;
            startDateHour = (startDateHour > 12) ? startDateHour - 12 : startDateHour;

            var endDateHour = endDate.getHours();
            var endDateHourAMPM = (endDateHour >= 12) ? 'PM' : 'AM';
            endDateHour = (endDateHour === 0) ? 12 : endDateHour;
            endDateHour = (endDateHour > 12) ? endDateHour - 12 : endDateHour;

            if(inputEvent.IsAllDayEvent === true && startDateText === endDateText)
            {
                eventInputVar.subtitleText = startDateText + ' All Day';
                eventInputVar.allDay = true;
            }
            else if(inputEvent.IsAllDayEvent === true && startDateText !== endDateText)
            {
                eventInputVar.subtitleText = startDateText + ' - ' + endDateText + ' All Day';
                eventInputVar.allDay = true;
            }
            else if(inputEvent.IsAllDayEvent === false && startDateText === endDateText)
            {
                eventInputVar.subtitleText = startDateText + ' at ' + this.pad(startDateHour) + ':' + this.pad(startDate.getMinutes()) + ' ' + startDateHourAMPM + ' - ' + this.pad(endDateHour) + ':' + this.pad(endDate.getMinutes()) +  ' ' + endDateHourAMPM + ' ' + timezoneLabel;
                eventInputVar.allDay = false;
            }
            else if(inputEvent.IsAllDayEvent === false && startDateText !== endDateText)
            {
                eventInputVar.subtitleText = startDateText + ' at ' + this.pad(startDateHour) + ':' + this.pad(startDate.getMinutes()) + ' ' + startDateHourAMPM;
                eventInputVar.subtitleText += ' - ' + endDateText + ' at ' + this.pad(endDateHour) + ':' + this.pad(endDate.getMinutes()) + ' ' + endDateHourAMPM + ' ' + timezoneLabel;
                eventInputVar.allDay = false;
            }
        }

        return eventInputVar;

    }

    populateCalendarEventsJSONObject(items) {

        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        let JSONEventInput = '';
        let eventInput = [];

        let descriptionLength = 0;
        if(this.checkMobile())
        {
            descriptionLength = 100;
        }
        else if(this.checkTablet())
        {
            descriptionLength = 150;
        }
        else
        {
            descriptionLength = 250;
        }

        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        let selectedTimezone = this.timezone;
        let timezoneURLParam = '';

        let urlTimezone = this.getURLParameter("timezone");

        if(urlTimezone !== undefined && urlTimezone !== null && urlTimezone.trim() !== '')
        {
            if(!this.isInit)
            {
                timezone = urlTimezone;
                this.timezone = timezone;
                selectedTimezone = urlTimezone;
            }
        }

        if(selectedTimezone !== undefined && selectedTimezone !== null && selectedTimezone.trim() !== '' && selectedTimezone != 'local')
        {
            timezone = selectedTimezone;
            timezoneURLParam = '?timezone=' + encodeURI(selectedTimezone);
        }

        let timezoneLabel = this.timezoneLabels[timezone];
        timezoneLabel = (timezoneLabel !== undefined && timezoneLabel !== null && timezoneLabel.trim() !== '') ? timezoneLabel : timezone ;

        for(let i=0;i<items.length;i++)
        {
            let eventInputVar = {};
            //eventInputVar.classNames;
            eventInputVar.id = items[i].Id;
            eventInputVar.title = (items[i].Type !== undefined && items[i].Type !== null && items[i].Type.trim() !== '') ? items[i].Type + ': ' : '';
            eventInputVar.title += items[i].Subject;
            eventInputVar.type = items[i].Type;
            eventInputVar.Event_URL__c = (items[i].Event_URL__c !== undefined && items[i].Event_URL__c !== null && items[i].Event_URL__c.trim() !== '') ? items[i].Event_URL__c : '';
            eventInputVar.Event_URL_Text__c = (items[i].Event_URL_Text__c !== undefined && items[i].Event_URL_Text__c !== null && items[i].Event_URL_Text__c.trim() !== '') ? items[i].Event_URL_Text__c : '';
            eventInputVar.detailsURL = '/' + items[i].Id + timezoneURLParam;
            
            if(items[i].Calendar_Rendering__c !== undefined && items[i].Calendar_Rendering__c !== null && items[i].Calendar_Rendering__c.trim() !== '')
            {
                eventInputVar.rendering = items[i].Calendar_Rendering__c;
            }

            if(items[i].Calendar_Background_Color__c !== undefined && items[i].Calendar_Background_Color__c !== null && items[i].Calendar_Background_Color__c.trim() !== '')
            {
                eventInputVar.backgroundColor = items[i].Calendar_Background_Color__c;
            }

            if(items[i].Calendar_Border_Color__c !== undefined && items[i].Calendar_Border_Color__c !== null && items[i].Calendar_Border_Color__c.trim() !== '')
            {
                eventInputVar.borderColor = items[i].Calendar_Border_Color__c;
            }

            if(items[i].Calendar_Text_Color__c !== undefined && items[i].Calendar_Text_Color__c !== null && items[i].Calendar_Text_Color__c.trim() !== '')
            {
                eventInputVar.textColor = items[i].Calendar_Text_Color__c;
            }

            eventInputVar.editable = false;
            
            if(items[i].Location !== undefined && items[i].Location !== null && items[i].Location.trim() !== '')
            {
                eventInputVar.location = items[i].Location;
            }
            
            if(items[i].Description !== undefined && items[i].Description !== null && items[i].Description.trim() !== '')
            {
                eventInputVar.description = items[i].Description;
                eventInputVar.shortDescription = (items[i].Description.length > descriptionLength) ? items[i].Description.substring(0,descriptionLength) + '...' : items[i].Description;
            }

           

            if(items[i].StartDateTime !== undefined && items[i].StartDateTime !== null && 
                items[i].EndDateTime !== undefined && items[i].EndDateTime !== null)
            {
                var startDateInitial = this.convertTextToDate(items[i].StartDateTime);
                var endDateInitial = this.convertTextToDate(items[i].EndDateTime);

                var startDateString = startDateInitial.toLocaleString(LOCALE, {timeZone: timezone});
                var endDateString = endDateInitial.toLocaleString(LOCALE, {timeZone: timezone});
                
                if(items[i].IsAllDayEvent === true)
                {
                    startDateString = new Date(items[i].StartDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: timezone});
                    endDateString = new Date(items[i].EndDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: timezone});
                }

                var startDate = new Date(startDateString);
                var endDate = new Date(endDateString);

                if(selectedTimezone === 'local')
                {
                    eventInputVar.start = startDate.toISOString();
                    eventInputVar.end = endDate.toISOString();
                }
                else 
                {
                    eventInputVar.start = this.getISOFormattedDateString(startDate);
                    eventInputVar.end = this.getISOFormattedDateString(endDate);
                }    

                var startDateText = months[startDate.getMonth()] + ' ' + startDate.getDate();
                var endDateText = months[endDate.getMonth()] + ' ' + endDate.getDate(); 
                var offset = 5 - (startDate.getTimezoneOffset()/60);

                var startDateHour = startDate.getHours();
                var startDateHourAMPM = (startDateHour >= 12) ? 'PM' : 'AM';
                startDateHour = (startDateHour === 0) ? 12 : startDateHour;
                startDateHour = (startDateHour > 12) ? startDateHour - 12 : startDateHour;

                var endDateHour = endDate.getHours();
                var endDateHourAMPM = (endDateHour >= 12) ? 'PM' : 'AM';
                endDateHour = (endDateHour === 0) ? 12 : endDateHour;
                endDateHour = (endDateHour > 12) ? endDateHour - 12 : endDateHour;

                if(items[i].IsAllDayEvent === true && startDateText === endDateText)
                {
                    eventInputVar.subtitleText = startDateText + ' All Day';
                    eventInputVar.allDay = true;
                }
                else if(items[i].IsAllDayEvent === true && startDateText !== endDateText)
                {
                    eventInputVar.subtitleText = startDateText + ' - ' + endDateText + ' All Day';
                    eventInputVar.allDay = true;
                }
                else if(items[i].IsAllDayEvent === false && startDateText === endDateText)
                {
                    eventInputVar.subtitleText = startDateText + ' at ' + this.pad(startDateHour) + ':' + this.pad(startDate.getMinutes()) + ' ' + startDateHourAMPM + ' - ' + this.pad(endDateHour) + ':' + this.pad(endDate.getMinutes()) +  ' ' + endDateHourAMPM + ' ' + timezoneLabel;
                    eventInputVar.allDay = false;
                }
                else if(items[i].IsAllDayEvent === false && startDateText !== endDateText)
                {
                    eventInputVar.subtitleText = startDateText + ' at ' + this.pad(startDateHour) + ':' + this.pad(startDate.getMinutes()) + ' ' + startDateHourAMPM;
                    eventInputVar.subtitleText += ' - ' + endDateText + ' at ' + this.pad(endDateHour) + ':' + this.pad(endDate.getMinutes()) + ' ' + endDateHourAMPM + ' ' + timezoneLabel;
                    eventInputVar.allDay = false;
                }
            } 

           
           if(items[i].Display_Events_Local_Timezone__c && items[i].Local_Timezone__c !== undefined && items[i].Local_Timezone__c !== null && !eventInputVar.allDay)
            {
                var localTimezoneLabel = this.timezoneLabels[items[i].Local_Timezone__c];
                localTimezoneLabel = (localTimezoneLabel !== undefined && localTimezoneLabel !== null && localTimezoneLabel.trim() !== '') ? localTimezoneLabel : items[i].Local_Timezone__c;

                var eventInputVarLocal= this.buildDateTimeTextInTimezone(items[i], items[i].Local_Timezone__c, LOCALE, '', localTimezoneLabel);

                if(eventInputVarLocal !== undefined && eventInputVarLocal !== null)
                {
                    if(eventInputVarLocal.subtitleText !== undefined && eventInputVarLocal.subtitleText !== null)
                    {
                        eventInputVar.subtitleTextLocal = JSON.parse(JSON.stringify(eventInputVarLocal.subtitleText)) + ' (Event Local Time)';
                    }
                }
            }
            
            eventInput.push(eventInputVar);
        }

        this.JSONEventInput = JSON.parse(JSON.stringify(eventInput));
        this.isInit = true;
    }

    renderCalendar()
    {
        
        try {

            var eventsJSONObj = this.JSONEventInput;
            
            var selectedTimezone = this.timezone;

            var calendarEl = this.template.querySelector('[data-id="calendar"]');

            var calendar = this.calendar;
            var eventColor = this.eventColor;

            var defaultView = (this.checkMobile()) ? 'listWeek' : 'dayGridMonth';
            var headerRight = (this.checkMobile()) ? 'timeGridDay,listWeek' : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek';

            if(calendar !== undefined && calendar !== null)
            {
                calendar.destroy();
            }

            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                defaultView: defaultView,
                //defaultDate: '2019-06-07',
                eventColor: eventColor,
                height: 'auto',
                header: {
                left: 'prev,next,today',
                center: 'title',
                right: headerRight
                },
                timeZone: selectedTimezone,
                events: eventsJSONObj,
                dayClick: (info) => {
                    var test;
                    info.preventDefault();
                },
                eventClick: (info) => {
                    var test;
                    info.preventDefault();
                },
                dateClick: (info) => {
                    var test;
                    info.preventDefault();
                },
                eventRender: (info) =>
                {
                    // render the timezone offset below the event title
                    try {
                        
                        if(info.view.type !== "listWeek")
                        {

                            $(info.el).addClass('eventPopover-'+info.event.id); 
                            $(info.el).bind( "click", {
                                info: info
                            }, (ev) => {
                                
                                //helper.handleShowPopover(component,event,helper,info, ev);

                            });

                        }
                        else
                        {

                            $(info.el).addClass('eventPopover-'+info.event.id);
                            $(info.el).bind( "click", {
                                info: info
                            },(ev) => {
                                
                                //helper.handleShowPopover(component,event,helper,info, ev);

                            });

                        }

                    } catch(err) 
                    {
                        console.log(err);
                    }
                    
                }
                
            });
            
            this.calendar = calendar;

            calendar.render();

            var buttonList = this.template.querySelectorAll('.fc-button');
            for(var i=0;i<buttonList.length;i++)
            {
                buttonList[i].tabIndex = "-1";
                buttonList[i].addEventListener('mousedown',function(ev){ev.preventDefault();});
            }

        } catch(err){

        }

    }


}