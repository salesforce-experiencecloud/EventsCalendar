import { LightningElement, api, track } from 'lwc';
import Cccalendar from 'c/cccalendar';
import ccBase from 'c/ccbase';
import fetchEvents from '@salesforce/apex/cccalendarController.getEvents';

export default class CceventDetails extends ccBase {

    @api event;
    @api isModal = false;
    @api recordId;
    @api timezoneLabelsJSON = '';
    @api hideEventDetailButton = false;
    @api eventDetailButtonText = 'More Info';
    @api truncate = false;
    @api noHeaderBorder = false;
    @api buttonsOnBottom = false;

    @track stylesSet = false;

    @api 
    get eventDetailSectionSize()
    {
        return (this.event !== undefined && this.event.eventImageURL !== undefined && this.event.eventImageURL !== null && this.event.eventImageURL.trim() !== '') ? '8' : '12' ;
    }

    @api 
    get divFormElementClasses()
    {
        return (this.truncate) ? 'slds-form-element slds-truncate' : 'slds-form-element' ;
    }

    @api
    get headerClasses()
    {
        return (this.noHeaderBorder) ? 'eventHeader noHeaderBorder slds-modal__header' : 'eventHeader slds-modal__header' ;
    }

    connectedCallback()
    {
        if(this.event !== undefined && this.event !== null)
        {
            this.event = JSON.parse(JSON.stringify(this.event));

        }
        else if(this.recordId !== undefined && this.recordId !== null && this.recordId.trim() !== '')
        {
            fetchEvents({
                pastMonths: 0,
                futureMonths: 0,
                eventLimit: 1,
                whatId: undefined,
                whoId: undefined,
                ownerId: undefined,
                recordId: this.recordId

            })
            .then((result) => {
                try {

                    let res = JSON.parse(result);
                    let itemsMap = res.eventsMap;
                    let items = Object.keys(itemsMap).map(
                        (key) => {
                            return itemsMap[key];
                        });

                    this.siteUrl = (res.siteUrl !== undefined && res.siteUrl !== null && res.siteUrl.trim() !== '') ? res.siteUrl : '';
                    
                    let localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    this.populateCalendarEvents(items);

                    if(this.events !== undefined && this.events !== null && this.events.length > 0)
                    {
                        this.event = JSON.parse(JSON.stringify(this.events[0]));
                    }

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
                    this.showToast('Error', this.convertErrorToJSONString(err2), 'error');
                }
            });
        }

    }

    handleCloseDetailsModal(e)
    {
        e.preventDefault();
        const closeModalDetailsEvent = new CustomEvent('closedetailsmodalevent');
        this.dispatchEvent(closeModalDetailsEvent);
    }

    renderedCallback()
    {
        if(this.event !== undefined && this.event !== null && this.stylesSet === false)     
        {
            let cccalendarEventIconSpan = this.template.querySelector('span[role="cccalendarEventIconSpan"]');
            if(cccalendarEventIconSpan !== undefined && cccalendarEventIconSpan !== null)
            {
                cccalendarEventIconSpan.style.setProperty('--lwc-colorTextIconDefault', this.event.backgroundColor);
                this.stylesSet = true;
            }
        }
    }

}