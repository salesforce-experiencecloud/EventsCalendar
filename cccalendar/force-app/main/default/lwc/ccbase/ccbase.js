import { LightningElement, track } from 'lwc';
import LANG from '@salesforce/i18n/lang';
import LOCALE from '@salesforce/i18n/locale';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Ccbase extends LightningElement {

    @track isInit = false;
    @track events;
    @track eventsMap = new Map();
    @track siteUrl = '';
    @track timezoneLabels = []; 

    @track timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    populateCalendarEvents(items) {

        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        this.timezoneLabels = (this.timezoneLabelsJSON !== undefined && this.timezoneLabelsJSON !== null && this.timezoneLabelsJSON.trim() !== '') ? JSON.parse(this.timezoneLabelsJSON) : this.timezoneLabels;

        let events = '';
        let eventInput = [];
        let eventMapInput = new Map();

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

        let tmptimezone = this.timezone;

        let timezoneURLParam = '';

        let urlTimezone = this.getURLParameter("timezone");

        if(urlTimezone !== undefined && urlTimezone !== null && urlTimezone.trim() !== '')
        {
            if(!this.isInit)
            {
                tmptimezone = urlTimezone;
                this.timezone = tmptimezone;
            }
        }

        let timezoneLabel = this.timezoneLabels[this.timezone];
        timezoneLabel = (timezoneLabel !== undefined && timezoneLabel !== null && timezoneLabel.trim() !== '') ? timezoneLabel : this.timezone ;

        if(tmptimezone !== undefined && tmptimezone !== null && tmptimezone.trim() !== '' && this.timezone != this.localTimezone)
        {
            timezoneURLParam = '?timezone=' + encodeURI(tmptimezone);
        }


        for(let i=0;i<items.length;i++)
        {
            let eventInputVar = {};
            eventInputVar.id = items[i].Id;
            eventInputVar.title = (items[i].Type !== undefined && items[i].Type !== null && items[i].Type.trim() !== '') ? items[i].Type + ': ' : '';
            eventInputVar.title += items[i].Subject;
            eventInputVar.type = items[i].Type;
            eventInputVar.iconName = (items[i].cccalendar__Event_Icon_Name__c !== undefined && items[i].cccalendar__Event_Icon_Name__c !== null && items[i].cccalendar__Event_Icon_Name__c.trim() !== '') ? items[i].cccalendar__Event_Icon_Name__c : '';
            eventInputVar.eventURL = (items[i].cccalendar__Event_URL__c !== undefined && items[i].cccalendar__Event_URL__c !== null && items[i].cccalendar__Event_URL__c.trim() !== '') ? items[i].cccalendar__Event_URL__c : '';
            eventInputVar.eventURLText = (items[i].cccalendar__Event_URL_Text__c !== undefined && items[i].cccalendar__Event_URL_Text__c !== null && items[i].cccalendar__Event_URL_Text__c.trim() !== '') ? items[i].cccalendar__Event_URL_Text__c : '';
            eventInputVar.eventURL2 = (items[i].cccalendar__Event_URL_2__c !== undefined && items[i].cccalendar__Event_URL_2__c !== null && items[i].cccalendar__Event_URL_2__c.trim() !== '') ? items[i].cccalendar__Event_URL_2__c : '';
            eventInputVar.eventURLText2 = (items[i].cccalendar__Event_URL_Text_2__c !== undefined && items[i].cccalendar__Event_URL_Text_2__c !== null && items[i].cccalendar__Event_URL_Text_2__c.trim() !== '') ? items[i].cccalendar__Event_URL_Text_2__c : '';
            eventInputVar.eventImageURL = (items[i].cccalendar__Image_URL__c !== undefined && items[i].cccalendar__Image_URL__c !== null && items[i].cccalendar__Image_URL__c.trim() !== '') ? items[i].cccalendar__Image_URL__c : '';
            eventInputVar.detailsURL = this.siteUrl + '/' + items[i].Id + timezoneURLParam;
            
            if(items[i].cccalendar__Calendar_Rendering__c !== undefined && items[i].cccalendar__Calendar_Rendering__c !== null && items[i].cccalendar__Calendar_Rendering__c.trim() !== '')
            {
                eventInputVar.rendering = items[i].cccalendar__Calendar_Rendering__c;
            }

            if(items[i].cccalendar__Calendar_Background_Color__c !== undefined && items[i].cccalendar__Calendar_Background_Color__c !== null && items[i].cccalendar__Calendar_Background_Color__c.trim() !== '')
            {
                eventInputVar.backgroundColor = items[i].cccalendar__Calendar_Background_Color__c;
            }

            if(items[i].cccalendar__Calendar_Border_Color__c !== undefined && items[i].cccalendar__Calendar_Border_Color__c !== null && items[i].cccalendar__Calendar_Border_Color__c.trim() !== '')
            {
                eventInputVar.borderColor = items[i].cccalendar__Calendar_Border_Color__c;
            }

            if(items[i].cccalendar__Calendar_Text_Color__c !== undefined && items[i].cccalendar__Calendar_Text_Color__c !== null && items[i].cccalendar__Calendar_Text_Color__c.trim() !== '')
            {
                eventInputVar.textColor = items[i].cccalendar__Calendar_Text_Color__c;
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

                var startDateString = startDateInitial.toLocaleString(LOCALE, {timeZone: this.timezone});
                var endDateString = endDateInitial.toLocaleString(LOCALE, {timeZone: this.timezone});
                
                if(items[i].IsAllDayEvent === true)
                {
                    startDateString = new Date(items[i].StartDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: this.timezone});
                    endDateString = new Date(items[i].EndDateTime.replace('T00','T23')).toLocaleString(LOCALE, {timeZone: this.timezone});
                }

                var startDate = new Date(startDateString);
                var endDate = new Date(endDateString);

                
                eventInputVar.start = this.getISOFormattedDateString(startDate);
                eventInputVar.end = this.getISOFormattedDateString(endDate);
                

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

           
           if(items[i].cccalendar__Display_Events_Local_Timezone__c === true && items[i].cccalendar__Local_Timezone__c !== undefined && items[i].cccalendar__Local_Timezone__c !== null && eventInputVar.allDay === false)
            {
                var localTimezoneLabel = this.timezoneLabels[items[i].cccalendar__Local_Timezone__c];
                localTimezoneLabel = (localTimezoneLabel !== undefined && localTimezoneLabel !== null && localTimezoneLabel.trim() !== '') ? localTimezoneLabel : items[i].cccalendar__Local_Timezone__c;

                var eventInputVarLocal= this.buildDateTimeTextInTimezone(items[i], items[i].cccalendar__Local_Timezone__c, LOCALE, '', localTimezoneLabel);

                if(eventInputVarLocal !== undefined && eventInputVarLocal !== null)
                {
                    if(eventInputVarLocal.subtitleText !== undefined && eventInputVarLocal.subtitleText !== null)
                    {
                        eventInputVar.subtitleTextLocal = JSON.parse(JSON.stringify(eventInputVarLocal.subtitleText)) + ' (Event Local Time)';
                    }
                }
            }
            
            eventInput.push(eventInputVar);
            eventMapInput[eventInputVar.id] = eventInputVar;
        }

        this.events = JSON.parse(JSON.stringify(eventInput));
        this.eventsMap = JSON.parse(JSON.stringify(eventMapInput));
        this.isInit = true;
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

            if(selectedTimezone === this.localTimezone)
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

    isInSitePreview()
    {
        return (window.location.host.indexOf('sitepreview') > 0 || window.location.host.indexOf('livepreview') > 0 || window.location.host.indexOf('live.') > 0);
    }

    convertErrorToJSONString(err)
    {
        let errJSONString = JSON.stringify(err);
        errJSONString = errJSONString.replace(/\{/g,'');
        errJSONString = errJSONString.replace(/\}/g,'');

        return errJSONString;
    }

    showToast(title, message, variant, mode='dismissable') {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

}