# Law of large numbers

## Internet is a public space not designed with privacy in mind

Internet is designed by the [Internet Engineering Task Force](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force) (IETF), the [Internet Research Task Force](https://en.wikipedia.org/wiki/Internet_Research_Task_Force) (IRTF), the [Internet Architecture Board](https://en.wikipedia.org/wiki/Internet_Architecture_Board) (IAB), and [independent authors](https://en.wikipedia.org/wiki/Request_for_Comments#cite_note-IndepSub-1) through the RFC  system. 

RFC *standing for Request for Comments* is a system supported by the [Internet Society](https://en.wikipedia.org/wiki/Internet_Society) (ISOC) deciding the standards of Internet since its early stage, ARPANET in 1969.

Internet core communication system haven't changed since 1989 and the TCP/IP suite RFC. In fact, it is considered as the breaking change from ARPANET to Internet. 

Standing for Transport Control Protocol and Internet Protocol, the TCP/IP suite refers to fundamentals protocols required for a standardised interconnected network of computer systems. If Internet Infrastructure was a delivery system, TCP/IP is its standard.

This standard oblige any **package** 📦 (packet) to have a maximum weight (1,500 bytes), have a correct address information for delivery and have the signature of the sender on it. All these informations are called **Metadata** and are attached to the package. 

```
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        IP Header                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        UDP Header                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Metadata Channel Header                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Metadata                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        IP Payload                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

An IP packet carrying metadata. [1](https://tools.ietf.org/html/draft-bryant-ip-metadata-00) [2](https://www.techrepublic.com/article/exploring-the-anatomy-of-a-data-packet/)

When a computer system send information using the Internet, it means it will send to a local post office 🏤 (a router) a package that follow strictly the TCP/IP standard with the Metadata form associated. This Post will know the next Post that know the next Post until a Post that know exactly where is the delivery address and deliver it.

In case that only the name (ex. designacademy.nl) of the receiver is specified on the Metadata, with no address (ex. 192.87.95.10), it means that the local post office will need to lookup in a **registry** the corresponding address to the given name. This process is called DNS lookup, and the registry in question is managed by [IANA](https://www.iana.org/) (Internet Assigned Numbers Authority) with some delegations to countries (ccTLD), communities, companies and others (gTLD). Replicates of these registries are hosted by ISPs, companies like [Google Public DNS](https://fr.wikipedia.org/wiki/Google_Public_DNS) or Cisco [OpenDNS](https://fr.wikipedia.org/wiki/OpenDNS), or by privacy-focused associations like **OpenNIC**. Your local post office will ask one of them the address behind the name.

```
traceroute to www.designacademy.nl (192.87.95.10), 64 hops max, 52 byte packets
 1  192.168.178.1 (192.168.178.1)  10.242 ms  5.882 ms  3.068 ms
 2  213.51.1.124 (213.51.1.124)  15.895 ms  15.937 ms  16.811 ms
 3  213.51.7.102 (213.51.7.102)  17.280 ms  17.360 ms  16.803 ms
 4  nl-ams04a-ri3-ae-9-0.aorta.net (84.116.130.242)  22.905 ms  40.244 ms  17.113 ms
 5  xe-2-1-5.jnr01.asd001a.surf.net (145.145.166.89)  24.953 ms  15.452 ms  16.855 ms
 6  lo0-2.asd002a-jnx-01-sn7-internet.surf.net (145.145.128.2)  16.088 ms  17.109 ms  16.598 ms
```

**Traceroute** is a computer system command that list every post office 🏤 (router) it encounter during the transit of a package to a specified address. Above an example with designacademy.nl.

This is roughly how works Internet since its creation, and while today there is additional encryption layers to protect the content of the package (TLS in 1999, HTTPS in 2000), there is nothing to protect the Metadata information to be seen from any one intercepting the package. 

Metadata contains most of the times enough information to make behaviour analysis and could easily lead to identification of the user. Worst, state-of-the-art technics like **Deep Packet Inspection** (DPI) let governments inspect the inner package during the transit using **supercomputers** like infamous Echelon. 

An other way for surveillance is to control the registry in which name-to-address correspondence are made by the Post Office to redirect the package to their own system first before sending it back to the real address. Some initiatives are fighting this practise by listing all known registries detained by intelligence agencies (see. https://github.com/CHEF-KOCH/NSABlocklist).

## Tor update Internet to be designed with privacy in mind

Concerns about lack of privacy in Internet are not new, and there are multiple attempts to fix it. Tor which is an abbreviation for **The Onion Router** is one of them and try to preserve privacy without sacrificing too much the usability of Internet (ease of use and performance wise).

Its main goal is to hide the sender's information (Metadata) from any post office (router) the package encounter.

This is done by introducing the concept of **relays**. These relays are volunteers lending some of their computer resources to be special Post Office, in other word some volunteer are transforming their computer in an **Onion Post Office**. 

As a sender, you will have to install the Tor program, and this program will select some Onion Post Office (relay) your package will go through before landing to a real Post Office, it's called a **TOR Circuit**. 

Before sending a package, the sender will hide it inside another package with the address of the next Onion Post Office to visit on it. Again, this new package will be put inside a package with the address of the next-next Onion Post Office to visit, etc... The sender will only sign the last wrapping package with his signature, the others will be signed by the Onion Post Office. This consecutive wrapping of package reminds the layers of an **Onion**.

When sent, the next Onion Post Office will open the wrapping package with a special key only him have, take and sign the inner package and send it to the next Onion Post Office that is already mentioned on the package.

By doing so, after the first Onion Post Office, no mention to the original sender will be ever written inside any inner packages. The last Onion Post Office will finally unwrap the last wrapping package and deliver the real package to a real Post Office that will deliver to the specified Internet Address. 

Thus, no connection can be made between the sender and the receiver, at least not without controlling some of the volunteer Onion Post Office computers. That concern is rapidly overcome by the number of Onion Post Office computers available in the World. The more there is, and the less risk there is to fail in a **Cheval de Troie** trap.

## Not going out Tor

I have explained how a sender can preserve its privacy during the transit of the package. But what about the receiver. It's the same as being the sender, except its address is not from the Internet Registry, but rather it's a rendezvous point in a volunteer Onion Post Office, when a sender want to be in contact with a hidden receiver, its package will go trough multiple Onion Post Office and wait at a pickup store, where the receiver will get it, when the receiver will want to send back a package, it will do so by using the same system as the receiver.