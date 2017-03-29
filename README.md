# [mizmoz.com](https://www.mizmoz.com) / mmm-lang

The markup language for creating emails and pages in Mizmoz.

This is an early version and is likely to be subject to significant changes to the API - you've be warned!

## Features
- mmm markup rendering to HTML for email and HTML for web
- Components for creating layouts (`Row`, `Column`, `Divider`)

## Components

### Row

Block level row element which is a container for any number of `Column` components.

```xml
<!-- Simple single column layout -->
<mmm-row>
  <mmm-column>
    <p>Hello world!</p>
  </mmm-column>
</mmm-row>
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`background-color`     | row background color           | #ffffff
`center-on-mobile`     | center the content on mobile   | true
`content-width`        | row width                      | 600px
`full-width`           | is the row 100% iof the page   | false
`padding`              | column padding                 | 0px
`spacing`              | position of column spacing     | none [none, inside, outside, both]
`spacing-color`        | column spacing color           |
`spacing-width`        | column spacing width           | 0px


### Column

Inline block element representing a column. Must be a child of `Row`.

By default the `Row` will calculate the column widths and pass them at render time.

```xml
<!-- Two column layout, each with 50% width -->
<mmm-row>
  <mmm-column>
    <p>Hello world!</p>
  </mmm-column>
  <mmm-column>
    <p>Hello world!</p>
  </mmm-column>
</mmm-row>
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`background-color`     | background color               | row background color 
`center-on-mobile`     | center the content on mobile   | true
`padding`              | column padding                 | 0px
`width`                | column width                   | 100%

The width can either be empty, in which case `width = row width / number of columns`

Fractions can also be used like width="1/4"


### Box

Block level container which helps to recreate the browser box model

```xml
<!-- Text with consistent padding and margins -->
<mmm-box padding="12px">
  <p>Hello world!</p>
  <p>Hello world!</p>
</mmm-box>
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`align`                | box alignment                  | initial
`background-color`     | background color               | 
`border-radius`        | box border radius              | 0
`margin`               | box margin                     | 0px
`padding`              | padding padding                | 0px
`width`                | width                          | auto
`height`               | height                         | auto


### Button

Block level button

```xml
<mmm-button background-color="blue" color="#ffffff" text="Click Here!" />
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`align`                | button alignment               | center
`background-color`     | background color               | #5db734
`border-radius`        | box border radius              | 3px
`box-shadow`           | button drop shadow             | none [none, subtle, dark, css `box-shadow: ...`
`color`                | button color                   | #ffffff
`font-family`          | font family for the button     | inherit
`font-size`            | font size                      | 14px
`margin`               | margin                         | 0px
`padding`              | padding                        | 12px
`width`                | width                          | auto
`text`                 | button label                   | Click me
`url`                  | url                            | 
`width`                | button width                   | auto


### Divider

Block level divider which can be used as a horzontal rule or more often just as a spacer to achieve 
pixel perfect padding.

```xml
<mmm-divider color="blue" height="24px" />
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`color`                | divider color                  | #ffffff
`margin`               | margin                         | 0px
`height`               | divider height                 | 100%
`width`                | divider width                  | 100%

### Image

Block level image element. All images are fluid by default with the width

```xml
<mmm-image
  src="https://www.mizmoz.com/img/logo.png"
  url="https://www.mizmoz.com"
  alt="Mizmoz logo"
/>
```

attribute              | description                    | default value [options]
-----------------------|--------------------------------|-------------------------------------------
`align`                | image alignment                | center
`alt`                  | image alt tag                  |  
`padding`              | column padding                 | 0px
`src`                  | url to the image               | 
`url`                  | url to link to                 | 
`height`               | max height                     | 100%
`width`                | max width                      | 100%


## Roadmap & Development

### Phase 1
- MMM parser
- Rendering engine (the basic renderer)
- Email HTML engine (for creating email HTML output)
- Website HTML engine

##### Template Engine
- `Row` container element for `Column`
- `Column` component
- `Box` container to recreate the browser box model consistently
- `Divider` used to create spacing between elements


### Rendering Order
- Parse `mmm > mmm-head > mmm-merge` to make `Merge` tags available to the rest of the template
- Parse and resolve all merge tags leaving in place any that don't resolve. 
This is so `user.*` & `live.*` tags aren't replaced
- Render `mmm > mmm-body > *` components
- Render `mmm > mmm-head > *` components
- Inline CSS rules

### Email Gotchas

- p tags should be replaced with tables with all styles applied to the td element (Outlook 07,10,12)
- replace margin with Margin


```xml
<mmm>
  <mmm-head>
    <mmm-title>Welcome to my website</mmm-title>
    <mmm-send-date>2016-12-24 00:00:00</mmm-send-date>
    <mmm-merge name="user.firstname" value="Ian" />
    <mmm-merge name="user.email" value="support@mizmoz.com" />
    <mmm-merge name="styles" json='{fontFamily:"Source Sans Pro",spacing:12,primaryColor:"black",padding:"12px"}' />
    <mmm-merge name="styles.fontWeight" value="12" />
  </mmm-head>
  <mmm-body>
    <mmm-row width="100%" content-width="600px">
      <mmm-column
          width="1/3"
          padding="{{styles.padding}}"
      >
        Menu
      </mmm-column>
      <mmm-column
          width="2/3"
      >
        Welcome {{user.firstname}} to this email!
      </mmm-column>
    </mmm-row>
    <mmm-row>
      <mmm-column>
        <ul mmm-repeatable="names">
          <li>{{name}}</li>
        </ul>
      </mmm-column>
    </mmm-row>
  </mmm-body>
</mmm>
```
