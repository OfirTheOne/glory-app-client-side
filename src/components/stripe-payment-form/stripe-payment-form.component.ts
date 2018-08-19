import { 
    Component, 
    OnInit, 
    ViewChild, 
    ElementRef, 
    Output, 
    Input, 
    EventEmitter 
} from '@angular/core';



declare var Stripe;
const stripeTestKey = 'pk_test_qe0umqOpJ81LK97pWL0x1k8J';

@Component({
    selector: 'app-stripe-payment-form',
    templateUrl: './stripe-payment-form.component.html',
})

export class StripePaymentFormComponent implements OnInit {
    stripe = Stripe(stripeTestKey);
    card: any;

    @Input() paymentData: { amount: number, owner: { [key: string]: any } };
    @Input() metadata: Object;

    @Output() onCreateSourceSeccuss = new EventEmitter<any>()
    @Output() onCreateSourceFail = new EventEmitter<any>()

    @ViewChild('paymentForm') paymentFormRef: ElementRef;
    @ViewChild('cardElement') cardElementRef: ElementRef;
    @ViewChild('cardErrors') cardErrorsRef: ElementRef;


    ngOnInit() {
        console.log('ngOnInit StripeJsComponent');
        this.setupStripe();
    }

    private setupStripe() {
        const elements = this.stripe.elements();

        const cardStyle = {
            base: {
                color: '#32325d',
                lineHeight: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        this.card = elements.create('card', { style: cardStyle });
        const cardElementID = this.cardElementRef.nativeElement.id;
        this.card.mount(`#${cardElementID}`);

        this.cardElementRef.nativeElement.addEventListener('change', event => {
            if (event.error) {
                this.cardErrorsRef.nativeElement.textContent = event.error.message;
            } else {
                this.cardErrorsRef.nativeElement.textContent = '';
            }
        });

        this.paymentFormRef.nativeElement.addEventListener('submit', async event => {
            event.preventDefault();

            const sourceData = this.setSourceData();
            // this.stripe.createToken(this.card)
            try {
                const result = await this.stripe.createSource(this.card, sourceData);
                if (result.error) {
                    this.cardErrorsRef.nativeElement.textContent = result.error.message;
                    this.onCreateSourceFail.next(result.error)
                } else {
                    console.log(result);
                    this.onCreateSourceSeccuss.next(result.source)
                }
            } catch (error) {
                console.log(error);
                this.onCreateSourceFail.next(error)
            }
        });

    }


    private setSourceData(): Object {
        const staticSourceData = {
            currency: 'usd',
            type: "card",
            usage: "reusable",
        }
        const sourceData = Object.assign(
            staticSourceData,
            this.paymentData,
            { metadata: this.metadata }
        );
        console.log(sourceData);
        return sourceData;
    }
}
