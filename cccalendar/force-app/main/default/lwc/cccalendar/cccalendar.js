import { api, track } from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullcalendar420';
import jquery341 from '@salesforce/resourceUrl/jquery341';
import fetchEvents from '@salesforce/apex/cccalendarController.getEvents';
import ccBase from 'c/ccbase';


export default class Cccalendar extends ccBase {

    @api timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    @api eventColor = 'Blue';
    @api pastMonths = 6;
    @api futureMonths = 6;
    @api eventLimit = 1000;
    @api whatId = '';
    @api whoId = '';
    @api ownerId = '';
    @api timezoneLabelsJSON = '{"America/Los_Angeles":"US Pacific Time","America/Chicago":"US Central Time","America/Denver":"US Mountain Time","America/Indianapolis":"US Eastern Time","GMT":"GMT","Asia/Jakarta":"Western Indonesian Time","Asia/Makassar":"Central Indonesian Time","Asia/Jayapura":"Eastern Indonesian Time","Asia/Kolkata":"India Standard Time","Asia/Tokyo":"Japan Time","Australia/Sydney":"Australian Eastern Standard Time","Australia/Darwin":"Australian Central Standard Time","Australia/Perth":"Australian Western Standard Time","Europe/London":"British Time","Europe/Paris":"Central European Time"}';
    @api overrideTimezoneList = false;
    @api listofTimezonesOverride = 'America/Los_Angeles,America/Chicago,America/Denver,America/Indianapolis,GMT,Europe/London,Europe/Paris,Asia/Jakarta,Asia/Makassar,Asia/Jayapura,Asia/Kolkata,Asia/Tokyo,Australia/Sydney,Australia/Darwin,Australia/Perth';

    @track calendar;
    @track items;
    @track itemsMap;
    @track timezoneLabels; 
    @track timezoneList;
    @track timezoneObjList;
    @track selectedEvent;
    @track eventDetailsModalOpen = false;
    @track escListener;

    localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    connectedCallback()
    {
        this.escListener = this.handleEscListener.bind(this);
            document.addEventListener(
                'keydown',
                this.escListener
            );
    }

    renderedCallback()
    {
        Promise.all([
            loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/core/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/bootstrap/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/daygrid/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/timegrid/main.min.css'),
            loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/list/main.min.css'),
            loadScript(this, jquery341 + '/jquery.min.js'),
            loadScript(this, fullCalendar + '/fullcalendar-4.2.0/packages/core/main.js')
          ]).then(() => {
            Promise.all([
                
                loadScript(this, fullCalendar + '/fullcalendar-4.2.0/packages/daygrid/main.min.js'),
                loadScript(this, fullCalendar + '/fullcalendar-4.2.0/packages/interaction/main.min.js'),
                loadScript(this, fullCalendar + '/fullcalendar-4.2.0/packages/timegrid/main.min.js'),
                loadScript(this, fullCalendar + '/fullcalendar-4.2.0/packages/list/main.min.js')
            ]).then(() => {
                try {
                    if(this.items === undefined || this.items === null || this.items.length === 0)
                    {
                        fetchEvents({
                            pastMonths: this.pastMonths,
                            futureMonths: this.futureMonths,
                            eventLimit: this.eventLimit,
                            whatId: this.whatId,
                            whoId: this.whoId,
                            ownerId: this.ownerId

                        })
                        .then((result) => {
                            try {
                                let res = JSON.parse(result);
                                this.itemsMap = res.eventsMap;
                                this.items = Object.keys(this.itemsMap).map(
                                    (key) => {
                                        return this.itemsMap[key];
                                    });
                                this.timezoneList = res.timezoneList;
                                this.populateTimezoneSelectList();
                                this.populateCalendarEvents(this.items, this.localTimezone);
                                this.renderCalendar();
                            } catch(err1){
                                if(this.isInSitePreview())
                                {
                                    console.log(err1+'');
                                    this.showToast('Error', this.convertErrorToJSONString(err1), 'error');
                                }
                            }
                        })
                        .catch((err2) => {
                            if(this.isInSitePreview())
                            {
                                console.log(err2+'');
                                this.showToast('Error', this.convertErrorToJSONString(err2), 'error','sticky');
                            }
                        });
                
                    }
                    
                } catch(err3) {
                    if(this.isInSitePreview())
                    {
                        console.log(err3+'');
                        this.showToast('Error', JSON.stringify(err3).replaceAll('{','').replaceAll('}',''), 'error');
                    }
                }
            });
          }).catch( (err4) => {
            if(this.isInSitePreview())
            {
                console.log(err4+'');
                this.showToast('Error', JSON.stringify(err4).replaceAll('{','').replaceAll('}',''), 'error');
            }
          });

          
    }

    populateTimezoneSelectList()
    {
        this.timezoneLabels = JSON.parse(this.timezoneLabelsJSON);
        this.timezoneObjList = new Array();
        let timezoneList = this.timezoneList;
        if(this.overrideTimezoneList && this.listofTimezonesOverride !== undefined && this.listofTimezonesOverride !== null && this.listofTimezonesOverride.trim() != '')
        {
            timezoneList = this.listofTimezonesOverride.split(',');
        }
        
        for(let i=0;i<timezoneList.length;i++)
        {
            timezoneList[i] = timezoneList[i].trim();
            let tz = {};
            tz.label = (this.timezoneLabels[timezoneList[i]] !== undefined && this.timezoneLabels[timezoneList[i]] !== null && this.timezoneLabels[timezoneList[i]].trim() !== '') ? this.timezoneLabels[timezoneList[i]] : timezoneList[i];
            tz.label = (timezoneList[i] === this.localTimezone) ? 'Local - ' + tz.label : tz.label;
            tz.value = timezoneList[i];
            
            this.timezoneObjList.push(tz);
        }
    }

    renderCalendar()
    {
        
        try {

            var eventsJSONObj = this.events;
            
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
                weekends: false,
                height: 'auto',
                header: {
                left: 'prev,next,today',
                center: 'title',
                right: headerRight
                },
                timeZone: selectedTimezone,
                events: eventsJSONObj,
                dayClick: (info) => {
                    info.preventDefault();
                },
                eventClick: (info) => {
                    info.preventDefault();
                },
                dateClick: (info) => {
                    info.preventDefault();
                },
                eventRender: (info) =>
                {
                    // render the timezone offset below the event title
                    try {
                        
                        if(info.view.type !== "listWeek")
                        {

                            $(info.el).addClass('eventPopover-'+info.event.id); 
                            info.el.setAttribute('data-event-id', info.event.id);
                            $(info.el).bind( "click", {
                                info: info
                            }, ((ev) => {
                                
                                this.handleEventClick(ev);

                            }).bind(this));

                        }
                        else
                        {

                            $(info.el).addClass('eventPopover-'+info.event.id);
                            info.el.setAttribute('data-event-id', info.event.id);
                            $(info.el).bind( "click", {
                                info: info
                            },((ev) => {

                                this.handleEventClick(ev);

                            }).bind(this));

                        }

                    } catch(err) 
                    {
                        if(this.isInSitePreview())
                        {
                            console.log(err+'');
                            this.showToast('Error', JSON.stringify(err).replaceAll('{','').replaceAll('}',''), 'error');
                        }
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
            if(this.isInSitePreview())
            {
                console.log(err+'');
                this.showToast('Error', JSON.stringify(err).replaceAll('{','').replaceAll('}',''), 'error');
            }
        }

    }

    handleEventClick(e)
    {
        try {

            let eventId = e.data.info.event.id;
            this.selectedEvent = this.eventsMap[eventId];

            this.eventDetailsModalOpen = true;

        } catch(err) {
            if(this.isInSitePreview())
            {
                console.log(err+'');
                this.showToast('Error', JSON.stringify(err).replaceAll('{','').replaceAll('}',''), 'error');
            }
        }
        
    }

    closeEventDetailsModal(e)
    {
        this.eventDetailsModalOpen = false;
        this.selectedEvent = undefined;
    }

    handleEscListener(e)
    {
        if(e.keyCode === 27 && this.eventDetailsModalOpen === true)
        {
            this.closeEventDetailsModal();
        }
    }

    handleTimezoneChange(e)
    {
        this.timezone = e.detail.value;
        this.populateCalendarEvents(this.items, this.localTimezone);
        this.renderCalendar();
    }


}