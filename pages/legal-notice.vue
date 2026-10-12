<script setup lang="ts">
import { MAINTAINER_NAME, SITE_NAME, canonicalUrl, githubBlobUrl } from '~/utils/site'

// Details are taken verbatim from the operator's own legal notice on
// semanticperformance.com (same person, same business). Only the parts that
// describe this site were adapted: what is published here, and under which
// licence. Never edit these figures from memory — copy them from the source.
useSeoMeta({
  title: `Legal notice — ${SITE_NAME}`,
  description: `Legal notice (Impressum) for ${SITE_NAME}: operator, contact and business details.`,
  robots: 'noindex, follow'
})

useHead({ link: [{ rel: 'canonical', href: canonicalUrl('/legal-notice/') }] })
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>Legal notice</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">Legal notice</h1>
    <p class="mt-2 text-muted">Impressum · Mentions légales</p>
    <p class="mt-3 text-sm text-faint">
      Published in accordance with Article 6 III-1 of French Law no. 2004-575 (LCEN).
    </p>

    <section class="mt-10">
      <h2 class="text-lg font-semibold">Publisher</h2>
      <p class="mt-3 text-muted leading-relaxed">
        {{ MAINTAINER_NAME }} (né Preissinger) — sole trader (entrepreneur individuel, EI)<br>
        24 Avenue de la Corse<br>
        13007 Marseille<br>
        France
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Contact</h2>
      <p class="mt-3 text-muted leading-relaxed">
        Email: <a href="mailto:av@semanticperformance.com" class="text-ink">av@semanticperformance.com</a><br>
        Phone: +33 6 95 30 46 88
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Business details</h2>
      <dl class="mt-3 text-muted leading-relaxed">
        <div class="flex flex-wrap gap-x-2">
          <dt class="text-ink">Legal form:</dt>
          <dd class="m-0">sole trader (micro-entrepreneur)</dd>
        </div>
        <div class="flex flex-wrap gap-x-2">
          <dt class="text-ink">SIREN:</dt>
          <dd class="m-0">105 727 044</dd>
        </div>
        <div class="flex flex-wrap gap-x-2">
          <dt class="text-ink">SIRET:</dt>
          <dd class="m-0">105 727 044 00015</dd>
        </div>
        <div class="flex flex-wrap gap-x-2">
          <dt class="text-ink">Commercial register:</dt>
          <dd class="m-0">RCS Marseille no. 105 727 044 (management no. 2026 A 03084)</dd>
        </div>
        <div class="flex flex-wrap gap-x-2">
          <dt class="text-ink">Activity code (APE/NAF):</dt>
          <dd class="m-0">62.02A — IT systems and software consultancy</dd>
        </div>
      </dl>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Responsible for content / Director of publication</h2>
      <p class="mt-3 text-muted leading-relaxed">
        {{ MAINTAINER_NAME }} (né Preissinger), address as above.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">VAT</h2>
      <p class="mt-3 text-muted leading-relaxed">
        VAT not applicable, Article 293 B of the French General Tax Code (French small-business
        scheme).
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Hosting</h2>
      <p class="mt-3 text-muted leading-relaxed">
        Vercel Inc.<br>
        440 N Barranca Avenue #4133<br>
        Covina, CA 91723<br>
        United States
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Dispute resolution</h2>
      <p class="mt-3 text-muted leading-relaxed">
        This site publishes documentation free of charge; nothing is sold here. We are neither
        obliged nor willing to participate in consumer dispute resolution proceedings. The European
        Commission's Online Dispute Resolution platform was discontinued in July 2025.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Liability and licence</h2>
      <p class="mt-3 text-muted leading-relaxed">
        The guidelines are compiled with care but provided without warranty as to accuracy,
        completeness or currency, and they are not legal advice. Operators of linked external sites
        are solely responsible for their own content.
      </p>
      <p class="mt-3 text-muted leading-relaxed">
        Guideline content is licensed under CC BY-SA 4.0, the site code under MIT. Both licences
        are in the
        <a :href="githubBlobUrl('LICENSE')" class="text-ink">repository</a>.
      </p>
    </section>
  </div>
</template>
