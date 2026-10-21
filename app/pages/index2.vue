<script setup></script>
<template>
  <div class="circle-container bg-green-200 w-50 h-50">
    <svg viewBox="0 0 100 100">
      <defs>
        <path
          id="circle"
          d="
        M 50,50
        m -37.5,0
        a 37,37 0 1,0 74,0
        a 37,37 0 1,0 -74 ,0
        "
        ></path>
        <path
          id="circle2"
          d="
        M 50,50
        m -45,0
        a 45, 45 0 1,0 90,0
        a 45, 45 0 1,0 -90 ,0
        "
        ></path>
      </defs>
      <text font-size="10px">
        <textPath
          xlink:href="#circle"
          startOffset="40%"
          text-anchor="middle"
        >
          Hi, this is lauragonzalezcomalada
        </textPath>
      </text>
      <text font-size="8px">
        <textPath
          xlink:href="#circle2"
          startOffset="40%"
          text-anchor="middle"
        >
          A software engineer with an eye for design
        </textPath>
      </text>
    </svg>
  </div>
</template>
<style scoped></style>
