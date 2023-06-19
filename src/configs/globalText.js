import React from 'react'
import { Text } from 'react-native'
import appFonts from './appFonts';

// ------------------------Black---------------------------- //

export const DemoTextBlack = React.memo(({ children, ...otherProps }) => {
    return (
      <Text
        numberOfLines={otherProps.numberOfLines}
        style={[
          {
            color: "#000000",
            fontSize: appFonts.n(otherProps?.fontSize || 12),
            fontFamily: appFonts.RBLACK,
            ...otherProps.style,
          },
        ]}
      >
        {children}
      </Text>
    );
})
export const DemoTextBoldBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RBLACK, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RBLACK, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RBLACK, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RBLACK, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinBlack = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#000000', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.NT, ...otherProps.style }]}>
            {children}
        </Text>
    )
})

// ------------------------White---------------------------- //

export const DemoTextWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBoldWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinWhite = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#ffffff', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
// ------------------------Blue---------------------------- //

export const DemoTextBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBoldBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9BD5DA', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})

// ------------------------Dark Blue---------------------------- //

export const DemoTextDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBoldDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinDarkBlue = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#5885AF', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})

// ------------------------Grey---------------------------- //

export const DemoTextGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBoldGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#747474', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
//-----------------LabelGrey-------------------//
export const DemoTextLabelGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelBoldGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelBookGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelLightGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelHeavyGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelRegularGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLabelThinGrey = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#9C9B9B', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
// <----------------------Purple Navy---------------->
export const DemoTextPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBoldPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextBookPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextLightPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextHeavyPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextRegularPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
        <Text numberOfLines={otherProps.numberOfLines} style={[{ color: '#625f8c', fontSize: appFonts.n(otherProps.fontSize || 12), fontFamily: appFonts.RB, ...otherProps.style }]}>
            {children}
        </Text>
    )
})
export const DemoTextThinPurpleNavy = React.memo(({ children, ...otherProps }) => {
    return (
      <Text
        numberOfLines={otherProps.numberOfLines}
        style={[
          {
            color: "#625f8c",
            fontSize: appFonts.n(otherProps.fontSize || 12),
            fontFamily: appFonts.RB,
            ...otherProps.style,
          },
        ]}
      >
        {children}
      </Text>
    );
})