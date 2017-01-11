# mmm-lang

The markup language for creating emails and pages in Mizmoz

## Features
- mmm markup rendering to HTML for email and HTML for web
- Components for creating layouts (Row, Column, Spacer)

## Components

### Row

## Roadmap & Development

### Phase 1
- MMM parser
- Rendering engine (the basic renderer)
- Email HTML engine (for creating email HTML output)
- Website HTML engine

##### Email Engine
- Email wrapper component
- `Row` container element for `Column`
- `Column` component
- `Box` container is just a `Row` > `Column` component helper
- `Spacer` used to create spacing between elements


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
    <mmm-merge>
      <mmm-attribute name="user.firstname" value="Ian" />
      <mmm-attribute name="user.email" value="ian@mizmoz.com" />
      <mmm-attribute name="styles" json='{fontFamily:"Source Sans Pro",spacing:12,primaryColor:"black",padding:"12px"}' />
      <mmm-attribute name="styles.fontWeight" value="12" />
    </mmm-merge>
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