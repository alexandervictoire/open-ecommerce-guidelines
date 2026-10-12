<script setup lang="ts">
import { MAINTAINER_NAME, SITE_NAME, canonicalUrl } from '~/utils/site'

// Adapted from the operator's own privacy policy on semanticperformance.com.
// Only what this site actually does is listed: it is a static site on Vercel
// with Vercel Web Analytics, no forms, no booking, no third-party fonts and no
// embedded third-party content. If anything of that changes — a form, an
// embed, a webfont — this page has to change with it.
useSeoMeta({
  title: `Privacy policy — ${SITE_NAME}`,
  description: `How ${SITE_NAME} handles personal data: hosting, server log files and audience measurement.`,
  robots: 'noindex, follow'
})

useHead({ link: [{ rel: 'canonical', href: canonicalUrl('/privacy/') }] })

const sections = [
  'Controller',
  'Principles',
  'Hosting and server log files',
  'Audience measurement',
  'Fonts and external content',
  'Cookies',
  'Recipients',
  'Your rights',
  'Changes'
]
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>Privacy policy</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">Privacy policy</h1>
    <p class="mt-2 text-muted">Datenschutzerklärung · Politique de confidentialité</p>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Contents</h2>
      <ol class="mt-3 text-muted leading-relaxed pl-5">
        <li v-for="section in sections" :key="section">{{ section }}</li>
      </ol>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">1. Controller</h2>
      <p class="mt-3 text-muted leading-relaxed">
        {{ MAINTAINER_NAME }} (né Preissinger, sole trader), trading as Semantic Performance<br>
        24 Avenue de la Corse, 13007 Marseille, France<br>
        Email: <a href="mailto:av@semanticperformance.com" class="text-ink">av@semanticperformance.com</a><br>
        Phone: +33 6 95 30 46 88
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        No data protection officer has been appointed, as the statutory conditions for doing so are
        not met.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">2. Principles</h2>
      <p class="mt-3 text-muted leading-relaxed">
        We process personal data solely within the framework of the GDPR and the French Data
        Protection Act (Loi Informatique et Libertés). We collect only what is necessary for the
        respective purpose, and we do not sell data.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">3. Hosting and server log files</h2>
      <p class="mt-3 text-muted leading-relaxed">
        This website is hosted with Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
        United States. When the site is accessed, data is transmitted automatically and stored in
        server log files: IP address, date and time of access, URL requested, volume of data
        transferred, referrer URL, browser type and operating system.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        Purpose: operation, stability and security of the website.<br>
        Legal basis: Art. 6(1)(f) GDPR (legitimate interest).<br>
        Retention period: the log files are stored by the hosting provider and deleted by them
        automatically. The retention period is set by the provider and depends on the plan in use;
        the periods that currently apply are documented in the provider's logs documentation.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        A data processing agreement is in place with the hosting provider. Any transfer to the USA
        takes place on the basis of Standard Contractual Clauses and/or the EU-US Data Privacy
        Framework.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">4. Audience measurement</h2>
      <p class="mt-3 text-muted leading-relaxed">
        We use Vercel Web Analytics, Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
        United States, for statistical analysis of website use.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        No cookies are set, no information is stored on or read from your device, no cross-device
        identifiers are created, and no data is used for cross-site tracking. Analysis is
        exclusively aggregated and anonymous; no link to an identifiable person is established. IP
        addresses are not stored.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        Purpose: understanding which content is used.<br>
        Legal basis: Art. 6(1)(f) GDPR (legitimate interest in data-minimising audience
        measurement).
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        A data processing agreement is in place with the provider. Any transfer to the USA takes
        place on the basis of Standard Contractual Clauses and/or the EU-US Data Privacy Framework.
        Because no information is stored on or read from your device, consent under Art. 82 of the
        Loi Informatique et Libertés is not required; the processing meets the CNIL's requirements
        for consent-exempt measurement.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">5. Fonts and external content</h2>
      <p class="mt-3 text-muted leading-relaxed">
        This site uses the fonts already installed on your device and loads no webfonts. No
        connection is made to third-party servers, in particular not to Google Fonts, and no
        third-party content is embedded — no images, no videos, no social media widgets.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        The site links to external pages, in particular to GitHub and to
        semanticperformance.com. Nothing is transmitted to those providers before you follow such a
        link, and following it takes you away from this website.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">6. Cookies</h2>
      <p class="mt-3 text-muted leading-relaxed">
        This website sets no cookies at all: no analytics cookies, no marketing cookies, and none
        that would require consent. A consent banner is therefore not required.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">7. Recipients</h2>
      <p class="mt-3 text-muted leading-relaxed">
        Personal data is passed on only to the providers named in this policy, which are required
        for the operation of this website. No disclosure for advertising purposes takes place.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">8. Your rights</h2>
      <p class="mt-3 text-muted leading-relaxed">
        You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17),
        restriction of processing (Art. 18), data portability (Art. 20) and a right to object to
        processing based on legitimate interests (Art. 21 GDPR). You may withdraw consent given at
        any time with effect for the future. Under French law you may also lay down directions for
        the handling of your data after your death (Art. 85 Loi Informatique et Libertés).
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        A message to
        <a href="mailto:av@semanticperformance.com" class="text-ink">av@semanticperformance.com</a>
        is sufficient to exercise these rights.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        Right to lodge a complaint: the competent supervisory authority is the CNIL, 3 Place de
        Fontenoy, TSA 80715, 75334 Paris Cedex 07, France — cnil.fr. Alternatively you may contact
        the supervisory authority of your habitual residence.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">9. Changes</h2>
      <p class="mt-3 text-muted leading-relaxed">
        We update this policy when the legal situation or this site changes.
      </p>
      <p class="mt-3 text-faint">Last updated: 12 October 2026</p>
    </section>
  </div>
</template>
