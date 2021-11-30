import { api, track } from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullcalendar420';
import jquery from '@salesforce/resourceUrl/jquery';
import fetchEvents from '@salesforce/apex/cccalendarController.getEventsWithFrequency';
import ccBase from 'c/ccbase';


export default class Cccalendar extends ccBase {

    @api eventColor = 'Blue';
    @api pastMonths = 6;
    @api futureMonths = 6;
    @api eventLimit = 1000;
    @api whatId = '';
    @api whoId = '';
    @api ownerId = '';
    @api timezoneLabelsJSON = '';
    @api overrideTimezoneList = false;
    @api listofTimezonesOverride = 'America/Los_Angeles,America/Chicago,America/Denver,America/Indianapolis,GMT,Europe/London,Europe/Paris,Asia/Jakarta,Asia/Makassar,Asia/Jayapura,Asia/Kolkata,Asia/Tokyo,Australia/Sydney,Australia/Darwin,Australia/Perth';
    @api hideEventDetailButton = false;
    @api eventDetailButtonText = 'More Info';
    @api showWeekends = false;
    @api hideMonthView = false;
    @api hideWeekView = false;
    @api hideDayView = false;
    @api hideListView = false;
    @api rangeFrequency = 'MONTH';
    @api buttonsOnBottom = false;
    @api truncate = false;
    @api truncateEachLine = false;
    @api truncateNumberOfLinesToDisplay = 3;

    @track calendar;
    @track items;
    @track itemsMap;
    @track timezoneList;
    @track timezoneObjList;
    @track selectedEvent;
    @track eventDetailsModalOpen = false;
    @track escListener;
    @track selectedViews = [];

    allViewsList = ['dayGridMonth','timeGridWeek','timeGridDay','listWeek'];

    connectedCallback()
    {
        this.escListener = this.handleEscListener.bind(this);
            document.addEventListener(
                'keydown',
                this.escListener
            );

            Promise.all([
                loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/core/main.min.css'),
                loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/bootstrap/main.min.css'),
                loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/daygrid/main.min.css'),
                loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/timegrid/main.min.css'),
                loadStyle(this, fullCalendar + '/fullcalendar-4.2.0/packages/list/main.min.css'),
                this.loadScript(jquery),
                this.loadScript(fullCalendar + '/fullcalendar-4.2.0/packages/core/main.js')
              ]).then(() => {
                Promise.all([
                    
                    this.loadScript(fullCalendar + '/fullcalendar-4.2.0/packages/daygrid/main.min.js'),
                    this.loadScript(fullCalendar + '/fullcalendar-4.2.0/packages/interaction/main.min.js'),
                    this.loadScript(fullCalendar + '/fullcalendar-4.2.0/packages/timegrid/main.min.js'),
                    this.loadScript(fullCalendar + '/fullcalendar-4.2.0/packages/list/main.min.js')
                ]).then(() => {
                    try {
                        if(this.items === undefined || this.items === null || this.items.length === 0)
                        {
                            fetchEvents({
                                pastMonths: this.pastMonths,
                                futureMonths: this.futureMonths,
                                rangeFrequency: this.rangeFrequency,
                                eventLimit: this.eventLimit,
                                whatId: this.whatId,
                                whoId: this.whoId,
                                ownerId: this.ownerId
    
                            })
                            .then((result) => {
                                try {
    
                                    let res = JSON.parse(result);
                                    if(res.error === undefined || res.error === null || res.error.trim() === '')
                                    {
                                        this.itemsMap = res.eventsMap;
                                        this.items = Object.keys(this.itemsMap).map(
                                            (key) => {
                                                return this.itemsMap[key];
                                            }).reverse();
                                        this.timezoneList = res.timezoneList;
    
                                        this.siteUrl = (res.siteUrl !== undefined && res.siteUrl !== null && res.siteUrl.trim() !== '') ? res.siteUrl : '';
    
                                        this.populateTimezoneSelectList();
                                        this.populateCalendarEvents(this.items);
                                        this.renderCalendar();
                                    }
                                    else
                                    {
                                        console.log('Error: ' + res.error);
                                        if(this.isInSitePreview())
                                        {
                                            this.showToast('Error', this.convertErrorToJSONString(res.error), 'error');
                                        }
                                    }
    
                                } catch(err1){
                                    console.log(err1+'');
                                    if(this.isInSitePreview())
                                    {
                                        this.showToast('Error', this.convertErrorToJSONString(err1), 'error');
                                    }
                                }
                            })
                            .catch((err2) => {
                                console.log(err2+'');
                                if(this.isInSitePreview())
                                {
                                    this.showToast('Error', this.convertErrorToJSONString(err2), 'error');
                                }
                            });
                    
                        }
                        
                    } catch(err3) {
                        console.log(err3+'');
                        if(this.isInSitePreview())
                        {
                            this.showToast('Error', JSON.stringify(err3).replaceAll('{','').replaceAll('}',''), 'error');
                        }
                    }
                });
              }).catch( (err4) => {
                console.log(err4+'');
                if(this.isInSitePreview())
                {
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

            var isMobile = this.checkMobile();
            this.selectedViews = [];
            for(let i=0;i<this.allViewsList.length;i++)
            {
                if(this.allViewsList[i] === 'dayGridMonth' && this.hideMonthView === false && isMobile === false)
                {
                    this.selectedViews.push(this.allViewsList[i]);
                }
                else if(this.allViewsList[i] === 'timeGridWeek' && this.hideWeekView === false && isMobile === false)
                {
                    this.selectedViews.push(this.allViewsList[i]);
                }
                else if(this.allViewsList[i] === 'timeGridDay' && this.hideDayView === false)
                {
                    this.selectedViews.push(this.allViewsList[i]);
                }
                else if(this.allViewsList[i] === 'listWeek' && this.hideListView === false)
                {
                    this.selectedViews.push(this.allViewsList[i]);
                }
            }

            var defaultView;
            if(this.selectedViews.length > 0)
            {
                if(this.selectedViews.includes('listWeek') === false && this.selectedViews.includes('timeGridDay') === false)
                {
                    throw "You must choose at least one view to show on mobile (You cannot hide both Day and List views).";
                }

                if(isMobile === false)
                {
                    defaultView = this.selectedViews[0];
                }
                else if(isMobile === true && this.selectedViews.includes('listWeek') === true)
                {
                    defaultView = 'listWeek';
                }
                else if(isMobile === true && this.selectedViews.includes('timeGridDay') === true)
                {
                    defaultView = 'timeGridDay';
                }
                
            }
            else 
            {
                throw "You must choose at least one view to show.";
            }

            var headerRight = this.selectedViews.join(',');

            if(calendar !== undefined && calendar !== null)
            {
                calendar.destroy();
            }

            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                defaultView: defaultView,
                //defaultDate: '2019-06-07',
                eventColor: eventColor,
                weekends: this.showWeekends,
                height: 'auto',
                header: {
                left: 'prev,next,today',
                center: 'title',
                right: headerRight
                },
                timeZone: selectedTimezone,
                events: eventsJSONObj,
                dayClick: (info) => {
                    try{
                        info.preventDefault();
                    } catch(err){}
                },
                eventClick: (info) => {
                    try{
                        info.preventDefault();
                    } catch(err){}
                },
                dateClick: (info) => {
                    try{
                        info.preventDefault();
                    } catch(err){}
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
                let ariaLabel = buttonList[i].getAttribute('aria-label');
                if(ariaLabel !== undefined && ariaLabel !== null && ariaLabel.trim() !== '' && ariaLabel === 'prev')
                {
                    buttonList[i].setAttribute('aria-label', 'previous');
                }
                buttonList[i].addEventListener('mousedown',
                    function(ev){
                        try{
                            ev.preventDefault();
                        } catch(err){}
                    });
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
        this.populateCalendarEvents(this.items);
        this.renderCalendar();
        const timeZoneEvent = new CustomEvent('CCCALENDAR_TIMEZONE_CHANGE', 
            { 
                detail: {
                    timezone: this.timezone 
                }
            });
        window.dispatchEvent(timeZoneEvent);
    }


}