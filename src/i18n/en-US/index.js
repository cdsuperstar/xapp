// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "Action failed",
  success: "Action was successful",
  buttons: {
    send: "Send",
  },
  auth: {
    network_error: "Network error. Please check your internet connection",
    submit: "Submit",
    home: "Home",
    navigation: "Navigation",
    my_account: "My account",
    administrator: {
      title: "Administrator",
    },
    superuser: {
      title: "Superuser",
      users: {
        users: "Users",
      },
    },
    labels: {
      email: "Email address",
      name: "Name",
      password: "Password",
      remember_me: "Remember me",
      repeat_password: "Repeat password",
    },
    errors: {
      password_length: "The minimum length of the password is 8 characters.",
      password_match: "Passwords do not match.",
      password: "password is required",
      email: "A valid email address is required",
    },
    login: {
      login: "Login",
      password_forgot: "Forgot your password?",
      verification_required:
        "Please check your email and verify your account first.",
      invalid_credentials: "Email address or password is incorrect.",
      email: "@:auth.labels.email",
      password: "@:auth.labels.password",
      remember_me: "@:auth.labels.remember_me",
    },
    register: {
      register: "Register",
      invalid_data:
        "Server could not process the request. Please correct the sent data.",
      already_registered:
        "Email address is already registered. Please check your email for verification.",
      account_created: "Account registration success!",
      email: "@:auth.labels.email",
      name: "@:auth.labels.name",
      password: "@:auth.labels.password",
      repeat_password: "@:auth.labels.repeat_password",
      cencel: "@:auth.logout.cancel",
      errors: {
        password_length: "@:auth.errors.password_length",
        password_match: "@:auth.errors.password_match",
        email: "@:auth.errors.email",
      },
      check_email:
        "You want to register with the email address {email}, is this correct?",
    },
    verification: {
      verification_success: "Your e-mail has been verified. You can now login.",
      verification_failed: "Verification has failed.",
    },
    logout: {
      logout_confirmation: "Are you sure you want to log out?",
      confirm: "Confirm",
      logout: "Logout",
      cancel: "Cancel",
    },
    password: {
      forgot: {
        header: "Request a new password",
        check_email: "Please check your email to reset your password.",
        email: "@:auth.labels.email",
      },
      reset: {
        header: "Reset your password",
        success:
          "Your password has been reset. You can now login with the new password.",
      },
      errors: {
        password_length: "@:auth.errors.password_length",
        password_match: "@:auth.errors.password_match",
      },
    },
    aggrid: {
      // for filter panel
      page: "daPage",
      more: "daMore",
      to: "daTo",
      of: "daOf",
      next: "daNexten",
      last: "daLasten",
      first: "daFirsten",
      previous: "daPreviousen",
      loadingOoo: "daLoading...",

      // for set filter
      selectAll: "daSelect Allen",
      searchOoo: "daSearch...",
      blanks: "daBlanc",

      // for number filter and text filter
      filterOoo: "daFilter...",
      applyFilter: "daApplyFilter...",
      equals: "daEquals",
      notEqual: "daNotEqual",

      // for number filter
      lessThan: "daLessThan",
      greaterThan: "daGreaterThan",
      lessThanOrEqual: "daLessThanOrEqual",
      greaterThanOrEqual: "daGreaterThanOrEqual",
      inRange: "daInRange",

      // for text filter
      contains: "daContains",
      notContains: "daNotContains",
      startsWith: "daStarts dawith",
      endsWith: "daEnds dawith",

      // filter conditions
      andCondition: "daAND",
      orCondition: "daOR",

      // the header of the default group column
      group: "laGroup",

      // tool panel
      columns: "laColumns",
      filters: "laFilters",
      rowGroupColumns: "laPivot Cols",
      rowGroupColumnsEmptyMessage: "la drag cols to group",
      valueColumns: "laValue Cols",
      pivotMode: "laPivot-Mode",
      groups: "laGroups",
      values: "laValues",
      pivots: "laPivots",
      valueColumnsEmptyMessage: "la drag cols to aggregate",
      pivotColumnsEmptyMessage: "la drag here to pivot",
      toolPanelButton: "la tool panel",

      // other
      noRowsToShow: "la no rows",
      enabled: "laEnabled",

      // enterprise menu
      pinColumn: "laPin Column",
      valueAggregation: "laValue Agg",
      autosizeThiscolumn: "laAutosize Diz",
      autosizeAllColumns: "laAutsoie em All",
      groupBy: "laGroup by",
      ungroupBy: "laUnGroup by",
      resetColumns: "laReset Those Cols",
      expandAll: "laOpen-em-up",
      collapseAll: "laClose-em-up",
      toolPanel: "laTool Panelo",
      export: "laExporto",
      csvExport: "laCSV Exportp",
      excelExport: "laExcel Exporto (.xlsx)",
      excelXmlExport: "laExcel Exporto (.xml)",

      // enterprise menu (charts)
      pivotChartAndPivotMode: "laPivot Chart & Pivot Mode",
      pivotChart: "laPivot Chart",
      chartRange: "laChart Range",

      columnChart: "laColumn",
      groupedColumn: "laGrouped",
      stackedColumn: "laStacked",
      normalizedColumn: "la100% Stacked",

      barChart: "laBar",
      groupedBar: "laGrouped",
      stackedBar: "laStacked",
      normalizedBar: "la100% Stacked",

      pieChart: "laPie",
      pie: "laPie",
      doughnut: "laDoughnut",

      line: "laLine",

      xyChart: "laX Y (Scatter)",
      scatter: "laScatter",
      bubble: "laBubble",

      areaChart: "laArea",
      area: "laArea",
      stackedArea: "laStacked",
      normalizedArea: "la100% Stacked",

      // enterprise menu pinning
      pinLeft: "laPin <<",
      pinRight: "laPin >>",
      noPin: "laDontPin <>",

      // enterprise menu aggregation and status bar
      sum: "laSum",
      min: "laMin",
      max: "laMax",
      none: "laNone",
      count: "laCount",
      average: "laAverage",
      filteredRows: "laFiltered",
      selectedRows: "laSelected",
      totalRows: "laTotal Rows",
      totalAndFilteredRows: "laRows",

      // standard menu
      copy: "laCopy",
      copyWithHeaders: "laCopy Wit hHeaders",
      ctrlC: "ctrl n C",
      paste: "laPaste",
      ctrlV: "ctrl n V",

      // charts
      pivotChartTitle: "laPivot Chart",
      rangeChartTitle: "laRange Chart",
      settings: "laSettings",
      data: "laData",
      format: "laFormat",
      categories: "laCategories",
      series: "laSeries",
      xyValues: "laX Y Values",
      paired: "laPaired Mode",
      axis: "laAxis",
      color: "laColor",
      thickness: "laThickness",
      xRotation: "laX Rotation",
      yRotation: "laY Rotation",
      ticks: "laTicks",
      width: "laWidth",
      length: "laLength",
      padding: "laPadding",
      chart: "laChart",
      title: "laTitle",
      background: "laBackground",
      font: "laFont",
      top: "laTop",
      right: "laRight",
      bottom: "laBottom",
      left: "laLeft",
      labels: "laLabels",
      size: "laSize",
      minSize: "laMinimum Size",
      maxSize: "laMaximum Size",
      legend: "laLegend",
      position: "laPosition",
      markerSize: "laMarker Size",
      markerStroke: "laMarker Stroke",
      markerPadding: "laMarker Padding",
      itemPaddingX: "laItem Padding X",
      itemPaddingY: "laItem Padding Y",
      strokeWidth: "laStroke Width",
      offset: "laOffset",
      offsets: "laOffsets",
      tooltips: "laTooltips",
      callout: "laCallout",
      markers: "laMarkers",
      shadow: "laShadow",
      blur: "laBlur",
      xOffset: "laX Offset",
      yOffset: "laY Offset",
      lineWidth: "laLine Width",
      normal: "laNormal",
      bold: "laBold",
      italic: "laItalic",
      boldItalic: "laBold Italic",
      predefined: "laPredefined",
      fillOpacity: "laFill Opacity",
      strokeOpacity: "laLine Opacity",
      columnGroup: "laColumn",
      barGroup: "laBar",
      pieGroup: "laPie",
      lineGroup: "laLine",
      scatterGroup: "laScatter",
      areaGroup: "laArea",
      groupedColumnTooltip: "laGrouped",
      stackedColumnTooltip: "laStacked",
      normalizedColumnTooltip: "la100% Stacked",
      groupedBarTooltip: "laGrouped",
      stackedBarTooltip: "laStacked",
      normalizedBarTooltip: "la100% Stacked",
      pieTooltip: "laPie",
      doughnutTooltip: "laDoughnut",
      lineTooltip: "laLine",
      groupedAreaTooltip: "laGrouped",
      stackedAreaTooltip: "laStacked",
      normalizedAreaTooltip: "la100% Stacked",
      scatterTooltip: "laScatter",
      bubbleTooltip: "laBubble",
      noDataToChart: "laNo data available to be charted.",
      pivotChartRequiresPivotMode: "laPivot Chart requires Pivot Mode enabled.",
    },
    users: {
      labels: {
        email: "Email",
        name: "Name",
      },
      edit_label: "Edit",
      verify_label: "Verify",
      verify_message: "Are you sure you want to verify {user}?",
    },
  },
};
