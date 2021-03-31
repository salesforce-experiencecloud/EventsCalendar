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
    @api truncateEachLine = false;
    @api truncateNumberOfLinesToDisplay = 3;
    @api noHeaderBorder = false;
    @api buttonsOnBottom = false;

    @track cccalendarEventIconSpanStylesSet = false;
    @track divTruncateEntireContentBlockStylesSet = false;

    @api 
    get eventDetailSectionSize()
    {
        return (this.event !== undefined && this.event.eventImageURL !== undefined && this.event.eventImageURL !== null && this.event.eventImageURL.trim() !== '') ? '8' : '12' ;
    }

    @api 
    get divFormElementClasses()
    {
        let divFormElementClasses = 'slds-form-element';
        if(this.truncate)
        {
            
            if(this.truncateEachLine)
            {
                divFormElementClasses += ' slds-truncate';
            }
            else
            {
                divFormElementClasses += ' truncateEntireContentBlock';
            }
        }
        else 
        {
            divFormElementClasses += ' noTruncate';
        }
        return divFormElementClasses;
    }

    @api
    get headerClasses()
    {
        return (this.noHeaderBorder) ? 'eventHeader noHeaderBorder slds-modal__header' : 'eventHeader slds-modal__header' ;
    }

    @api
    get divTitleClasses()
    {
        let divTitleClasses = 'slds-text-heading_medium slds-hyphenate';
        if(this.truncate)
        {
            divTitleClasses += ' slds-truncate';
        }
        return divTitleClasses;
    }

    @api 
    get eventDetailButtonTitle()
    {
        let tmpTitle = '';
        
        tmpTitle += (this.event !== undefined && this.eventDetailButtonText !== undefined && 
            this.eventDetailButtonText !== null && this.eventDetailButtonText.trim() !== '') ? this.eventDetailButtonText + ', ' : '';
        
        tmpTitle += (this.event !== undefined && this.event.title !== undefined && this.event.title !== null 
            && this.event.title.trim() !== '' ) ? this.event.title : '' ;

        return tmpTitle;
    }

    @api 
    get eventURLTextTitle()
    {
        let tmpTitle = '';
        
        tmpTitle += (this.event !== undefined && this.event.eventURLText !== undefined && 
            this.event.eventURLText !== null && this.event.eventURLText.trim() !== '') ? this.event.eventURLText + ', ' : '';
        
        tmpTitle += (this.event !== undefined && this.event.title !== undefined && this.event.title !== null 
            && this.event.title.trim() !== '' ) ? this.event.title : '' ;

        return tmpTitle;
    }

    @api 
    get eventURLTextTitle2()
    {
        let tmpTitle = '';
        
        tmpTitle += (this.event !== undefined && this.event.eventURLText2 !== undefined && 
            this.event.eventURLText2 !== null && this.event.eventURLText2.trim() !== '') ? this.event.eventURLText2 + ', ' : '';
        
        tmpTitle += (this.event !== undefined && this.event.title !== undefined && this.event.title !== null 
            && this.event.title.trim() !== '' ) ? this.event.title : '' ;

        return tmpTitle;
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
        if(this.event !== undefined && this.event !== null)     
        {
            let cccalendarEventIconSpan = this.template.querySelector('span[role="cccalendarEventIconSpan"]');
            if(cccalendarEventIconSpan !== undefined && cccalendarEventIconSpan !== null && this.cccalendarEventIconSpanStylesSet === false)
            {
                cccalendarEventIconSpan.style.setProperty('--lwc-colorTextIconDefault', this.event.backgroundColor);
                this.cccalendarEventIconSpanStylesSet = true;
            }

            let divTruncateEntireContentBlock = this.template.querySelectorAll('div.truncateEntireContentBlock');
            if(divTruncateEntireContentBlock !== undefined && divTruncateEntireContentBlock !== null && this.divTruncateEntireContentBlockStylesSet === false
                && this.truncateNumberOfLinesToDisplay !== undefined && this.truncateNumberOfLinesToDisplay !== null)
            {
                for(let i=0; i < divTruncateEntireContentBlock.length; i++)
                {
                    divTruncateEntireContentBlock[i].style.setProperty('--cccalendar-line-clamp', this.truncateNumberOfLinesToDisplay);
                    this.divTruncateEntireContentBlockStylesSet = true;
                }
                
            }

        }
    }

}