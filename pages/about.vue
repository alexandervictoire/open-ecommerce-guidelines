<script setup lang="ts">
import { MAINTAINER_NAME, MAINTAINER_URL, SITE_NAME, canonicalUrl, githubBlobUrl } from '~/utils/site'

// TODO (maintainer): the prose on this page is a placeholder. The structure and
// the headings are in place; replace the paragraphs with your own text.
useSeoMeta({
  title: `About — ${SITE_NAME}`,
  description: `Who maintains ${SITE_NAME}, how guidelines get in, and why the collection exists.`
})

useHead({ link: [{ rel: 'canonical', href: canonicalUrl('/about/') }] })
</script>

<template>
  <div class="container-prose py-12">
    <nav class="text-sm text-faint mb-6">
      <NuxtLink to="/" class="no-underline hover:text-ink">Home</NuxtLink>
      <span class="mx-2">/</span>
      <span>About</span>
    </nav>

    <h1 class="text-3xl font-semibold tracking-tight">About this collection</h1>

    <p class="mt-6 text-sm text-faint border border-dashed border-line rounded-md px-4 py-3">
      TODO: placeholder text. The structure below is final; the wording is to be replaced by the
      maintainer.
    </p>

    <section class="mt-10">
      <h2 class="text-lg font-semibold">What this is</h2>
      <p class="mt-3 text-muted leading-relaxed">
        An open collection of testable e-commerce guidelines. Each one describes an observable
        condition, why it matters, how to check it, and what to change — with a vendor-neutral core
        and separate notes where Shopware and Shopify actually differ.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Why it exists</h2>
      <p class="mt-3 text-muted leading-relaxed">
        Shop quality is usually discussed in opinions. These guidelines are written so that two
        people checking the same shop reach the same verdict, and so that software can read the
        result as well as a person.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">Who maintains it</h2>
      <p class="mt-3 text-muted leading-relaxed">
        The collection is maintained by
        <a :href="MAINTAINER_URL" class="text-ink">{{ MAINTAINER_NAME }}</a>, who works with
        merchants on exactly these checks at Semantic Performance. The guidelines stay independent
        of that work: they describe what is observable in a shop, not what any provider sells.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-lg font-semibold">How a guideline gets in</h2>
      <p class="mt-3 text-muted leading-relaxed">
        Anyone can propose one as a pull request. A guideline is accepted when it is testable,
        reproducible, non-duplicative and vendor-neutral in its core — the criteria are written
        down in
        <a :href="githubBlobUrl('CONTRIBUTING.md')" class="text-ink">CONTRIBUTING.md</a>.
        Guidelines are published and then revised in the open rather than held back for a long
        review.
      </p>
    </section>
  </div>
</template>
