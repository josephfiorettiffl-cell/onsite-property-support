
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const clean = (v='') => String(v).trim().slice(0,4000);

export async function POST(request){
  try{
    const body = await request.json();
    if(clean(body.website)) return Response.json({ok:true});

    for(const field of ['name','company','email','property','serviceType','message']){
      if(!clean(body[field])){
        return Response.json({error:`Missing ${field}.`},{status:400});
      }
    }

    const text = [
      `Name: ${clean(body.name)}`,
      `Company: ${clean(body.company)}`,
      `Email: ${clean(body.email)}`,
      `Phone: ${clean(body.phone)}`,
      `Property: ${clean(body.property)}`,
      `Visit type: ${clean(body.serviceType)}`,
      `Timing: ${clean(body.timing)}`,
      '',
      'Access notes:',
      clean(body.accessNotes),
      '',
      'Message:',
      clean(body.message)
    ].join('\n');

    const { error } = await resend.emails.send({
      from:'On-Site Property Support <website@onsitepropertysupport.com>',
      to:['service@onsitepropertysupport.com'],
      replyTo:clean(body.email),
      subject:`Request a Visit — ${clean(body.property).slice(0,120)}`,
      text
    });

    if(error) return Response.json({error:'Message service error.'},{status:502});
    return Response.json({ok:true});
  }catch{
    return Response.json({error:'Invalid request.'},{status:400});
  }
}
