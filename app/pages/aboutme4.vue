<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()
</script>

<template>
  <div class="relative h-screen w-full">
    <div class="absolute inset-0 pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 20, y: 30 }"
        :opacities="[1, 0.6, 0.8, 0.6]"
        :pParticles="
          tm('aboutme.country_list').map((country) => {
            return {
              text: rt(country),
            }
          })
        "
        :minFontSize="30"
        :maxCount="22"
        :circleRadius="80"
        :includeShadows="false"
        :spinEnabled="true"
        :includeInnerMessage="true"
        :greetingSize="22"
      />
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 80, y: 30 }"
        :pParticles="[
          {
            text: 'KurtVonnegut',
            class: 'text-blue-500',
            click: 'https://www.goodreads.com/en/book/show/4981.Slaughterhouse_Five',
          },
          {
            text: 'Lazerleo',
            class: 'text-red-500',
            click:
              'https://www.polarsteps.com/Lazerleo?utm_source=ig&onelink_id=PGsO&shortlink=pnlcr&af_dp=polarsteps%3A%2F%2Fuser%2F6091850&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacA-LNN-ud7Pk_iK9qv5dUK_d4ZLDGur8MJyKkuSmyxv2_urOxMUcqf0eulTQ_aem_61zbFSNOakdAdjhCE4Xtog&pid=organic_social&af_xp=custom&utm_content=link_in_bio&c=Pioneer%20PROFILE%20REDIRECT%20lazerleo_cyclonaut&utm_medium=social&source_caller=ui',
          },
          {
            text: 'LauraLazarino',
            class: 'text-green-500',
            click: 'https://losviajesdenena.com/',
          },

          {
            text: 'NadieSabeNada',
            class: 'text-yellow-500',
            click: 'https://losviajesdenena.com/',
          },
          {
            text: '5W',
            class: 'text-purple-500',
            click: 'https://www.revista5w.com/',
          },
          {
            text: 'LauraLazarino',
            class: 'text-[#FEAD40]',
            click: 'https://losviajesdenena.com/',
          },

          {
            text: 'NadieSabeNada',
            class: 'text-[#FF4A41]',
            click: 'https://losviajesdenena.com/',
          },
          {
            text: '5W',
            class: 'text-[#2BB46D]',
            click: 'https://www.revista5w.com/',
          },
        ]"
        :minFontSize="25"
        :maxCount="30"
        :circleRadius="80"
        :includeShadows="true"
        :spinEnabled="false"
        :startAngle="-60"
        :includeVinilImage="true"
      />
    </div>
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 50, y: 60 }"
        :opacities="[1, 1, 1]"
        :pParticles="[
          {
            text: 'I was born',
            class: 'text-warning font-light',
            details: 'in a sunny Friday 23th of November, back in 2001',
          },
          {
            text: 'I studied',
            class: 'text-warning font-light',
            details: ' Telecommunications Engineering at ETSETB, part of UPC – BarcelonaTech.',
          },
          {
            text: 'Did my thesis',
            class: 'text-warning',
            details: 'about LLM Audio Features Extraction at Leibniz Universität Hannover',
          },
          {
            text: 'After graduating,',
            class: 'text-warning',
            details:
              'I started building for the web, exploring new techniques and turning creative ideas into working projects',
          },
          {
            text: 'Nowadays, ',
            class: 'text-warning',
            details:
              'I build end-to-end solutions using modern technologies to make useful, intuitive, and playful digital experiences.',
          },
          {
            text: 'Nowadays, ',
            class: 'text-warning',
            details:
              'I build end-to-end solutions using modern technologies to make useful, intuitive, and playful digital experiences.',
          },
        ]"
        :minFontSize="20"
        :maxCount="3"
        :circleRadius="40"
        :includeShadows="false"
        :spinEnabled="false"
      />
    </div>
    <!--  <div class="absolute inset-0 pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 50, y: 90 }"
        :opacities="[1, 0.3, 0.8, 0.3]"
        :pParticles="[
          {
            text: 'sun',
            class: 'text-secondary/30',
          },
        ]"
        :minFontSize="100"
        :maxCount="100"
        :circleRadius="80"
        :includeShadows="false"
        :spinEnabled="false"
        :includeInnerMessage="true"
        :innerMessage="['aboutme.skills_line1', '']"
      />
    </div>-->
  </div>
</template>
<style scoped></style>
